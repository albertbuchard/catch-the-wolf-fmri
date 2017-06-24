<?php
  ini_set('display_errors', 0);
  require_once './utilities.php';

  $accredited = false;
  $shouldLog = false;
  $GLOBALS['results_should_log'] = false;
  $httpStatus = 500;
  $result = ['message' => ''];
  try {
    if (($_USE_SESSIONS) && (is_session_started() === FALSE )) session_start();
    // Check for valid request and presence of credentials
    $data = [];
    if (isset($_SERVER['CONTENT_TYPE']) && $_SERVER['CONTENT_TYPE'] === 'application/json') {

        // Fetch data json object
        $rawBody = file_get_contents('php://input');
        // if json object valid
        $data = json_decode($rawBody ?: '', true);
    }

    $data += ['query' => null, 'credentials' => null,'interface' => $_INTERFACE_REST, 'variables' => null];
    if ($data['query'] === null) {
        // $data = $_POST;
        throw new Exception('Empty or invalid query', 1);
    }

    // Connect to the db
    $bdd = connect_to_db();

    // Look for credentials
    $userId = null;
    $credentials = $data['credentials'];
    if ($data['query'] === $_QUERY_LOGIN) {
      if (!is_array($credentials)) {
        throw new Exception("Invalid credentials - A", 1);
      } elseif ((array_key_exists("logKey", $credentials))&&(array_key_exists("userId", $credentials))) {
        // try to login with a logKey -- only check if accredited - return credential if so
        $accredited = is_accredited($bdd, ['userId' => $credentials['userId'], 'logKey' => $credentials['logKey']]);
        if ($accredited['status']) {
          $result['credentials'] = ['userId' => $credentials['userId'], 'logKey' => $credentials['logKey']];
          $result['newUser'] = false;
        } else {
          $result['message'] = $accredited['message'];
        }
      } else {
        $logged = login($bdd, $data['credentials']);
        if (is_array($logged) && ($logged['status'])) {
          $result['credentials'] = ['type' =>  $logged['type'], 'userId' =>  $logged['userId'], 'logKey' =>  $logged['logKey']];
          $result['newUser'] = false;
        } elseif ($_SHOULD_CREATE_USERS_ON_LOGIN) {
          // login failure - try to create new user
          $signup = signup($bdd, $data['credentials']);
          if (is_array($signup) && ($signup['status'])) {
            $result['credentials'] = $signup;
            $result['newUser'] = true;
          } elseif ($signup['message'] == 'User already exists'){
            $result['message'] = 'Wrong password';
          } else {
            $result['message'] = $signup['message'];
          }
        } else {
          $result['message'] = $logged['message'];
        }
      }
      if (!array_key_exists('credentials', $result)) {
        throw new Exception($result['message'], 1);
      }
    } elseif ($data['query'] === $_QUERY_SIGNUP)  {
      // create new user
      $logged = signup($bdd, $data['credentials']);
      if (is_array($logged)) {
        $result['credentials'] = $logged;
        $result['newUser'] = true;
      }
    } else {
      if (isset($credentials['userId']) && isset($credentials['logKey'])) {
        $userId = $credentials['userId'];
        $logKey = $credentials['logKey'];
      } elseif ($_USE_SESSIONS && isset($_SESSION['userId']) && isset($_SESSION['logKey'])) {
        $userId = $credentials['userId'];
        $logKey = $credentials['logKey'];
      }else {
        $shouldLog = true;
        throw new Exception("is_accredited: no valid credentials passed", 1);
      }

      // TODO Should we use an OAuth library.. ?
      // http://bshaffer.github.io/oauth2-server-php-docs/cookbook/
      $accredited = is_accredited($bdd, ['userId' => $userId, 'logKey' => $logKey]);
      $result['message'] = $accredited['message'];
      if (!$accredited['status']) {
        $shouldLog = true;
        throw new Exception($result['message'], 1);
      }

      $query = $data['query'];
      $variables = $data['variables'];

      $interface = $data['interface'];
      if ($data['interface'] === $_INTERFACE_REST) {

        // Add endpoint
        if ($data['query'] == 'add') {
          if (($variables === null) || (!isset($variables['table'])) || (!isset($variables['rows']))) {
            throw new Exception("Invalid data", 1);
          }
          $rows = $variables['rows'];
          if (!is_array($rows)) {
            throw new Exception("Invalid rows", 1);
          }

          $table = $variables['table'];
          if (!is_string($table)) {
            throw new Exception("Invalid table " .json_encode($table), 1);
          }

          $rowsAdded = add_rows($bdd, $table, $rows);
          $result += ['status' => 'OK', 'Rows added' => json_encode($rowsAdded)];
        }

        // Checkpoints endpoint
        if ($query === "getCheckpoint") {
          $checkpoint = get_checkpoint($bdd, $userId);
          $result += ['status' => 'OK'] + $checkpoint;
        }

        if ($query === "hasCheckpoint") {
          if (($variables === null) || (!isset($variables['checkpoint']))) {
            throw new Exception("Invalid data", 1);
          }

          $checkpoint = has_checkpoint($bdd, $userId, $variables['checkpoint']);
          $result += ['status' => 'OK'] + $checkpoint;
        }

        if ($query === 'getLastInteraction') {
          $interaction = get_last_interaction($bdd, $userId);
          $result += ['status' => 'OK'] + $interaction;

        }

        if ($query === 'getFinalCode') {
          $finalCode = get_final_code($bdd, $userId);
          $result += ['status' => 'OK'] + $finalCode;
        }
      }

    }

    $httpStatus = 200;
  } catch (Exception $e) {
    $result['errorMessage'] = $e.message;
    $httpStatus = 500;

    $result['shouldLog'] = ($shouldLog || $GLOBALS['results_should_log']);
  }



  header('Content-Type: application/json', true, $httpStatus);
  echo json_encode($result);

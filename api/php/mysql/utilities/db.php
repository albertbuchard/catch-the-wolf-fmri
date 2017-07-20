<?php
/* =============== DB UTILS =============== */
function connect_to_db() {
  try {
    // if you use a local server you need to use hostname found in db and crate a new user
    // with all privileges on that hostname
    // http://stackoverflow.com/questions/4093603/how-do-i-find-out-my-mysql-url-host-port-and-username
    // http://stackoverflow.com/questions/1559955/host-xxx-xx-xxx-xxx-is-not-allowed-to-connect-to-this-mysql-server
    // Reset root password: https://dev.mysql.com/doc/refman/5.7/en/resetting-permissions.html
      return get_db_connection($GLOBALS['DB_HOST'], $GLOBALS['DB_NAME'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS']);
  } catch (Exception $e) {
    throw $e;
  }
}

function connect_to_participant_db() {
  try {
      return get_db_connection($GLOBALS['DB_HOST'], $GLOBALS['DB_PARTICIPANT_NAME'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS']);
  } catch (Exception $e) {
    throw $e;
  }
}

function user_has_done_experiment($userId, $exptId) {
  try {
    if (!is_array($exptId)){
      if (is_string($exptId)) {
        $exptId = [$exptId];
       } else {
         throw new Exception('check_if_user_has_done_experiment : invalid exptid');
       }
    }

    $bdd = connect_to_participant_db();
    $query = "SELECT exptid FROM experiments
                WHERE sid = :userId
                AND exptId IN ('". implode("','", $exptId) ."')";


    $params = ['userId' => $userId];
    $req = prepare_and_execute($bdd, $query, $params);
    $count = $req->rowCount();
    if ($count >= 1) {
      $rows = $req->fetchAll(PDO::FETCH_ASSOC);
      $done = "";
      foreach ($rows as $index => $row) {
        if ($index>0) { $done .= ","; }
        $done .= $row['exptid'];
      }

      return $done;
    } else {
      // user has not done the experiments
      return false;
    }
  } catch (Exception $e) {
    throw new Exception('check_if_user_has_done_experiment : ' . $e->getMessage());
  }
}

function set_done_experiment($userId, $exptId) {
  try {
    if (user_has_done_experiment($userId, $exptId)) {
      return true;
    }
    $bdd = connect_to_participant_db();
    $query = "INSERT INTO `experiments` (`sid`, `exptid`, `status`, `db`) VALUES (:userId, :exptId, 'done', :exptId);";


    $params = ['userId' => $userId, 'exptId' => $exptId];
    $req = prepare_and_execute($bdd, $query, $params);
    $count = $req->rowCount();
    if ($count == 1) {
      return true;
    } else {
      throw new Exception("Could not add experiment.");
    }
  } catch (Exception $e) {
    throw new Exception('set_done_experiment : ' . $e->getMessage());
  }
}


function get_db_connection($host, $dbname, $username, $password, $port = 3306)
{
  $connect_string = "mysql:host=" . $host . ";port=" . $port . ";dbname=" . $dbname . ";";
  $bdd = null;
  try {
    $bdd = new PDO($connect_string, $username, $password);
  } catch (Exception $e) {
    throw new Exception('get_db_connection : ' . $e->getMessage());
  }
  return $bdd;
}

function pdo_ping($bdd)
{
  try {
    $bdd->query('SELECT 1');
  } catch (PDOException $e) {
    return false;
  }
  return true;
}

<?php
/* ==== REST API ==== */
function prepare_and_execute($bdd, $query, $params = null) {
  try {
    $req = $bdd->prepare($query);
    if ($params) bind_values($req, $params);
    $req->execute();
    if ($req) {
      return $req;
    } else {
      var_dump("ONE");
      throw new Exception("prepare_and_execute: update was unsuccessful -- " . $req->errorInfo()[2], 1);
    }
  } catch (Exception $e) {
    var_dump("TWO");
    throw new Exception("prepare_and_execute: error. ". $e['message'], 1);
  }
}

function bind_values($req, $params) {
  if (!($req instanceof PDOStatement)) {
    throw new Exception("bind_values: req is not a PDOStatement", 1);
  }
  if (!isAssoc($params)) {
    throw new Exception("bind_values: invalid params", 1);
  }

  try {
    foreach ($params as $key => $value) {
      $type = PDO::PARAM_STR;
      if (is_bool($value)) {
        $type = PDO::PARAM_BOOL;
      } elseif (is_int($value)) {
        $type = PDO::PARAM_INT;
      } elseif (is_array($value)) {
        $value = json_encode($value);
      }
      $req->bindValue(":${key}", $value, $type);
    }
  } catch (Exception $e) {
    throw new Exception("bind_values: error while binding params ". $e['message'], 1);
  }
}


function get_checkpoint($bdd, $userId) {
  if (!pdo_ping($bdd)){
    throw new Exception("get_checkpoint: bdd is not a valid pdo connection", 1);
  }

  $table = $GLOBALS['_TABLE_CHECKPOINTS'];
  $noCheckpoint = $GLOBALS['_NO_CHECKPOINT'];

  if (!is_existing_table($bdd,$table)) {
    return ['code' => $noCheckpoint, 'timestamp' => 0];
  }

  $query = "SELECT code, dbTimestamp, message FROM ${table}
            WHERE userId = :userId
            ORDER BY dbTimestamp DESC
            LIMIT 1";


  // execute the query
  $req = prepare_and_execute($bdd, $query, ['userId' => $userId]);

  $count = $req->rowCount();
  if ($count >= 1) {
    $rows = $req->fetchAll(PDO::FETCH_ASSOC);
    return ['code' => $rows[0]['code'], 'timestamp' => $rows[0]['dbTimestamp'], 'message' => $row[0]['message']];
  } else {
    return ['code' => $noCheckpoint, 'timestamp' => 0];
  }
}

function has_checkpoint($bdd, $userId, $checkpoint) {
  if (!pdo_ping($bdd)){
    throw new Exception("get_checkpoint: bdd is not a valid pdo connection", 1);
  }

  $table = $GLOBALS['_TABLE_CHECKPOINTS'];
  $noCheckpoint = $GLOBALS['_NO_CHECKPOINT'];

  if (!is_existing_table($bdd,$table)) {
    return ['found' => false, 'code' => $noCheckpoint, 'timestamp' => 0, 'message' => 'Table missing'];
  }

  $query = "SELECT code, dbTimestamp, message FROM ${table}
            WHERE userId = :userId AND code = :code
            LIMIT 1";


  // execute the query
  $req = prepare_and_execute($bdd, $query, ['userId' => $userId, 'code' => $checkpoint]);

  $count = $req->rowCount();
  if ($count >= 1) {
    $rows = $req->fetchAll(PDO::FETCH_ASSOC);
    return ['found' => true, 'code' => $rows[0]['code'], 'timestamp' => $rows[0]['dbTimestamp'], 'message' => $rows[0]['message']];
  } else {
    return ['found' => false, 'code' => $userId, 'timestamp' => 0, 'message' => 'Not found'];
  }
}

function get_final_code($bdd, $userId) {
  if (!pdo_ping($bdd)){
    throw new Exception("get_checkpoint: bdd is not a valid pdo connection", 1);
  }

  $checkpoint = has_checkpoint($bdd, $userId, $GLOBALS['_CHECKPOINT_TASKDONE']);
  if ($checkpoint['code'] == $GLOBALS['_CHECKPOINT_TASKDONE']) {

    $query = "SELECT assignmentId FROM `user_assignments`
              WHERE userId = :userId
              LIMIT 1";

    // execute the query
    $req = prepare_and_execute($bdd, $query, ['userId' => $userId]);

    $count = $req->rowCount();
    if ($count >= 1) {
      $rows = $req->fetchAll(PDO::FETCH_ASSOC);
      return ['status' => 'OK', 'code' => $rows[0]['assignmentId']];
    }
    return ['status' => 'OK', 'code' => null, "error" => "A"];
  } else {
    return ['status' => 'OK', 'code' => null, "error" => "B"];
  }

}

function set_assignment($bdd, $userId, $assignmentId) {
  if (!pdo_ping($bdd)){
    throw new Exception("get_checkpoint: bdd is not a valid pdo connection", 1);
  }

  // get user from bd with userid
  $query = "SELECT assignmentId FROM user_assignments
              WHERE userId = :userId";

  $params = [];
  $params['userId'] = $userId;

  $req = prepare_and_execute($bdd, $query, $params);
  $count = $req->rowCount();
  $countb = 0;
  if ($count >= 1) {
    if ($GLOBALS['_SHOULD_UPDATE_ASSIGNMENT_ID']) {
      $rows = $req->fetchAll(PDO::FETCH_ASSOC);
      if ($rows[0]['assignmentId'] != $assignmentId) {
        $query = "UPDATE `user_assignments` SET `assignmentId`=:assignmentId WHERE `userId` = :userId";

        $params = [];
        $params['userId'] = $userId;
        $params['assignmentId'] = $assignmentId;

        $req = prepare_and_execute($bdd, $query, $params);
      }
    }
    $countb = 1;
  } else {
    $tempsShoudAddUserId = $GLOBALS['_SHOULD_SET_USERID_FOR_ALL_ADD'];
    $GLOBALS['_SHOULD_SET_USERID_FOR_ALL_ADD'] = false;
    $GLOBALS['userId'] = $userId;

    $rows = add_rows($bdd, 'user_assignments', ["userId" => $userId, "assignmentId" => $assignmentId]);
    $countb = count($rows);

    $GLOBALS['_SHOULD_SET_USERID_FOR_ALL_ADD'] = $tempsShoudAddUserId;
  }

  if ($countb >= 1) {
      return ['status' => 'OK'];
  } else {
      return ['status' => false, 'message' => "set_code: could not add code"];
  }
}

function signup($bdd, $credentials) {
  if ((!is_array($credentials)) || (!isset($credentials['userId'])) || (!isset($credentials['password']))) {
    throw new Exception("login: invalid credentials", 1);
  }

  try {

    $userId = $credentials['userId'];
    $password = $credentials['password'];


    $checkExist = get_user($bdd, $userId);
    if ($checkExist->rowCount() > 0) {
      return ['status' => false, 'message' => 'User already exists'];
    }


    // TODO Think of potential attack here and how to protect
    // Check valid user ID -- needs to be a mturkId

    $tempsShoudAddUserId = $GLOBALS['_SHOULD_SET_USERID_FOR_ALL_ADD'];
    $GLOBALS['_SHOULD_SET_USERID_FOR_ALL_ADD'] = false;
    $GLOBALS['userId'] = $userId;

    $rows = add_rows($bdd, 'users', ["userId" => $userId, "password" => password_hash($password, PASSWORD_DEFAULT), "type" => 2]);

    $GLOBALS['_SHOULD_SET_USERID_FOR_ALL_ADD'] = $tempsShoudAddUserId;

    $count = count($rows);
    if ($count == 1) {
        // generate logKey
        $k = range("q","9 ");
        shuffle($k);
        $logKey = substr(implode($k), 0, 20);
        set_logkey($bdd, $userId, $logKey);

        return ['status' => 'OK', 'type' => $rows[0]['type'], 'userId' => $userId, 'logKey' => $logKey];
    } elseif ($count == 0) {
      return ['status' => false, 'message' => 'Could not create user'];
    } else {
      // userId should be unique
      return ['status' => false, 'message' => 'Could not create user'];
    }
  } catch (Exception $e) {
    throw $e;
  }
}

function get_user($bdd, $userId) {
    try {
      // get user from bd with userid
      $query = "SELECT password, type FROM users
                  WHERE userId = :userId";

      $params = [];
      $params['userId'] = $userId;

      $req = prepare_and_execute($bdd, $query, $params);
      return $req;
    } catch (Exception $e) {
      throw $e;
    }
}

function login($bdd, $credentials) {
    if ((!is_array($credentials)) || (!isset($credentials['userId'])) || (!isset($credentials['password']))) {
      throw new Exception("login: invalid credentials", 1);
    }

    try {

      $userId = $credentials['userId'];
      $password = $credentials['password'];

      $req = get_user($bdd, $userId);
      $count = $req->rowCount();
      if ($count == 1) {
        $rows = $req->fetchAll(PDO::FETCH_ASSOC);
        // use hash to compare password
        if (password_verify($password , $rows[0]['password'])) {
          if ($GLOBALS['_SHOULD_CHECK_TASK_END']) {
            $checkpoint = has_checkpoint($bdd, $userId, $GLOBALS['_CHECKPOINT_TASKEND']);
            if ($checkpoint['code'] == $GLOBALS['_CHECKPOINT_TASKEND']) {
              return ['status' => false, 'message' => $checkpoint['message']];
            }
          }
          // generate logKey
          $k = range("q","9 ");
          shuffle($k);
          $logKey = substr(implode($k), 0, 20);

          // replace logKey into DB
          // TODO think about when to remove the logkey ...
          set_logkey($bdd, $userId, $logKey);

          return ['status' => true, 'type' => $rows[0]['type'], 'userId' => $userId, 'logKey' => $logKey];
        } else {
          // invalid password
          return ['status' => false, 'message' => 'Invalid credentials'];
        }
      } elseif ($count == 0) {
        // invalid userId
        return ['status' => false, 'message' => 'Invalid credentials'];
      } else {
        // userId should be unique
        throw new Exception("login: duplicated id ? " . $count, 1);
      }
    } catch (Exception $e) {
      throw $e;
    }


}

function set_logkey($bdd, $userId, $logKey) {
  $params = [];
  $ipQuery = "";

  if ($GLOBALS['_USE_LOG_IP'] === true) {
    $ipQuery .= ", logIp = :logIp ";
    $params['logIp'] = $_SERVER['REMOTE_ADDR'];
  }

  $query = "UPDATE users
            SET logKey = :logKey, logKeyTime = :logKeyTime${ipQuery}
            WHERE userId = :userId";

  $params['userId'] = $userId;
  $params['logKey'] = $logKey;
  $params['logKeyTime'] =  get_timestamp_ms();

  try {
    $req = prepare_and_execute($bdd, $query, $params);

    $GLOBALS['userId'] = $userId;
    add_rows($bdd, 'userLogs', [$params]);
  } catch (Exception $e) {
    throw $e;
  }

}

function set_last_interaction($bdd, $userId, $time = NULL) {
  $params = [];
  $ipQuery = "";
  if (is_null($time)) { $time = get_timestamp_ms(); }

  $query = "UPDATE users
            SET lastInteraction = :lastInteraction
            WHERE userId = :userId";

  $params['userId'] = $userId;
  $params['lastInteraction'] =  $time;

  try {
    $req = prepare_and_execute($bdd, $query, $params);

  } catch (Exception $e) {
    throw $e;
  }

}

function get_last_interaction($bdd, $userId) {
  $params = [];
  $ipQuery = "";
  if (is_null($time)) { $time = get_timestamp_ms(); }

  $query = "SELECT lastInteraction FROM users
            WHERE userId = :userId";

  $params['userId'] = $userId;

  try {
    $req = prepare_and_execute($bdd, $query, $params);
    $count = $req->rowCount();
    if ($count >= 1) {
      $rows = $req->fetchAll(PDO::FETCH_ASSOC);
      return ['lastInteraction' => $rows[0]['lastInteraction']];
    } else {
      $GLOBALS['results_should_log'];
      throw new Exception("Invalid credentials", 1);
    }
  } catch (Exception $e) {
    throw $e;
  }

}

function get_timestamp_ms() {
  return round(microtime(true) * 1000);
}

function check_logkey_and_refresh($bdd, $userId, $logKeyTime) {
  // should check if expires ? If null does not check
  if (is_int($GLOBALS['_LOGKEY_EXPIRES_IN'])) {
    $return = false;
    $params = ['userId' => $userId];
    $logKeyQuery = "";
    // check that the key has not expired
    if  ($GLOBALS['_LOGKEY_EXPIRES_IN']+intval($logKeyTime) > get_timestamp_ms()) {
      //updated the logKeyTime to now so as to prevent logout
      $params['logKeyTime'] = get_timestamp_ms();
      $return = true;
    } else {
      // expired: delete logkey
      $params['logKey'] = '';
      $params['logKeyTime'] = 0;
      $logKeyQuery = ", logKey = :logKey ";
    }

    $query = "UPDATE users
              SET logKeyTime = :logKeyTime${logKeyQuery}
              WHERE userId = :userId";

    try {
      $req = prepare_and_execute($bdd, $query, $params);
      return $return ;
    } catch (Exception $e) {
      throw $e;
    }

  }
  return true;
}

function has_been_away_for_too_long($bdd, $userId) {
  $lastInteraction = get_last_interaction($bdd, $userId);
  $lastTime = 0;
  if (is_array($lastInteraction) && array_key_exists('lastInteraction', $lastInteraction)) {
    $lastTime = (float)$lastInteraction['lastInteraction'];
  }

  if ((is_null($GLOBALS['_CHECKPOINT_START_CHECK_TIME']) || has_checkpoint($bdd, $userId, $GLOBALS['_CHECKPOINT_START_CHECK_TIME'])['found']) && !has_checkpoint($bdd, $userId, $GLOBALS['_CHECKPOINT_TASKDONE'])['found']) {
    if ($lastTime === 0) {
      return ['status' => true, 'message' => 'Never seen before'];
    } elseif (get_timestamp_ms() - $lastTime < $GLOBALS['_MAXIMUM_TIME_AWAY']) {
      return ['status' => true, 'message' => 'In time'];
    } else {
      $GLOBALS['userId'] = $userId;
      $message = 'You have been away for more than 20 min.';
      add_rows($bdd, 'checkpoints', [['code' => $GLOBALS['_CHECKPOINT_TASKEND'], 'message' => $message]]);
      return ['status' => false, 'message' => $message];
    }
  } else {
    return ['status' => true, 'message' => 'Outside time check limits'];
  }


}

function is_accredited($bdd, $data = []) {
  if (!pdo_ping($bdd)){
    throw new Exception("is_accredited: bdd is not a valid pdo connection", 1);
  }

  $userId = null;
  $logKey = null;
  if (isset($data['userId']) && isset($data['logKey'])) {
    $userId = $data['userId'];
    $logKey = $data['logKey'];
  } elseif (isset($_SESSION['userId']) && isset($_SESSION['logKey'])) {
    $userId = $data['userId'];
    $logKey = $data['logKey'];
  }else {
    throw new Exception("is_accredited: no valid credentials passed", 1);
  }

  $query = "SELECT logIp, logKey, logKeyTime, type FROM users
              WHERE userId = :userId";

  $params = ['userId' => $userId];
  $req = prepare_and_execute($bdd, $query, $params);
  $count = $req->rowCount();
  if ($count == 1) {
    $rows = $req->fetchAll(PDO::FETCH_ASSOC);
    $message = '';

    if ($GLOBALS['_SHOULD_CHECK_TASK_END']) {
      $checkpoint = has_checkpoint($bdd, $userId, $GLOBALS['_CHECKPOINT_TASKEND']);
      if ($checkpoint['code'] == $GLOBALS['_CHECKPOINT_TASKEND']) {
        return ['status' => false, 'message' => $checkpoint['message']];
      }
    }
    if ($GLOBALS['_SHOULD_CHECK_LAST_INTERACTION']) {
      $away = has_been_away_for_too_long($bdd, $userId);
      $message .= $away['message'];
    }

    if (($logKey == $rows[0]['logKey'])&&((!$GLOBALS['_USE_LOG_IP'])||($_SERVER['REMOTE_ADDR'] == $rows[0]['logIp']))) {
      if (check_logkey_and_refresh($bdd, $userId, $rows[0]['logKeyTime'])) {
        return ['status' => true, 'type' => $rows[0]['type'], 'message' => $message];
      }
      return ['status' => false, 'message' => 'Session expired'];
    } else {
      return ['status' => false, 'message' => 'Invalid Credentials'];
    }
  } elseif ($count == 0) {
    // invalid userId
    return ['status' => false, 'message' => 'Invalid credentials'];
  } else {
    // userId should be unique
    throw new Exception("is_accredited: duplicated id ? " . $count, 1);
  }

}

function is_row_object($row) {
  if ((is_array($row)) && (count($row) > 0) && (!is_array(reset($row)))) {
    return true;
  } else {
    return false;
  }
}

function is_duplicate($bdd, $table, $row) {
  if (!pdo_ping($bdd)){
    throw new Exception("is_accredited: bdd is not a valid pdo connection", 1);
  }

  $query = "SELECT * FROM ${table} WHERE ";
  $and = false;
  foreach ($row as $key => $value) {
    if ($and) {
      $query .= " AND ";
    }
    $query .= "${key} = :${key} ";
    $and = true;
  }


  $req = $bdd->prepare($query);

  foreach ($row as $key => $value) {
    $type = PDO::PARAM_STR;
    if (is_bool($value)) {
      $type = PDO::PARAM_BOOL;
    } elseif (is_int($value)) {
      $type = PDO::PARAM_INT;
    }
    $req->bindParam(":${key}", $value, $type);
  }

  $req->execute();
  $count = $req->rowCount();
  if ($count === 0) {
    return false;
  } else {
    return true;
  }
}

function set_user_timestamp($rows, $userId) {
    for ($i=0; $i < count($rows); $i++) {
      $row = $rows[$i];

      if (!isAssoc($row)) {
        throw new Exception("set_user_timestamp: invalid row", 1);
      }
      if (!isset($row['userId']) || !array_key_exists('userId', $row)) {
        $rows[$i]['userId'] = $userId;
      }
      if (!isset($row['dbTimestamp']) || !array_key_exists('dbTimestamp', $row)) {
        $rows[$i]['dbTimestamp'] = get_timestamp_ms();
      }
    }
    return $rows;
}

function check_user_did_task($bdd, $userId) {
  if (!pdo_ping($bdd)){
    throw new Exception("check_user_did_task: bdd is not a valid pdo connection", 1);
  }

  $table = $GLOBALS['_TABLE_DATA'];

  $query = "SELECT * from ${table}  where userId = :userId";
  $params = ['userId' => $userId];
  $req = prepare_and_execute($bdd, $query, $params);
  $count = $req->rowCount();
  if ($count < $GLOBALS['_COUNT_THRESHOLD']) {
    return false;
  } else {
    return true;
  }
}

function add_rows($bdd, $table, $rows) {
  if (!pdo_ping($bdd)){
    throw new Exception("add_rows: bdd is not a valid pdo connection", 1);
  }

  if (is_null($GLOBALS['userId'])) {
   throw new  Exception("add_rows: no valid user id.", 1);
  }

  if ($GLOBALS['_SHOULD_SET_USERID_FOR_ALL_ADD']) {
    // add userId and dbTimestamp to all tables even if not sent by the dataManager
    $rows = set_user_timestamp($rows, $GLOBALS['userId']);
  }

  if (isAssoc($rows)){
    $rows = [$rows];
  }

  if ($GLOBALS["_SHOULD_CHECK_IF_USER_DID_TASK"] && ($table == $GLOBALS['_TABLE_CHECKPOINTS'])) {
    foreach ($rows as $key => $row) {
      if ($row['code'] == $GLOBALS['_CHECKPOINT_TASKDONE']) {
        if(!check_user_did_task($bdd, $GLOBALS['userId'])) {
          // TODO cheating ?
          $table = $GLOBALS['_TABLE_DATA'];

          $query = "SELECT * from ${table}  where userId = :userId";
          return ['message' => 'Not done'];
        }
      }
    }
  }

  table_exists_or_create($bdd, $table, $rows);


  $query = "INSERT INTO ${table} (";
  $values = " VALUES (";



  $valuesRow = [];
  $i = 0;
  foreach ($rows as $j => $row) {
    $and = false;
    $valuesRow[$j] = "";
    if (!is_row_object($row)) {
      throw new Exception("Invalid row " . $i, 1);
    }

    foreach ($row as $key => $value) {
      if ($key === 'id') continue;
      if ($and) {
        $query .= ($i > 0) ? "" :" , ";
        $valuesRow[$j] .= " , ";
      }
      $query .= ($i > 0) ? "" :"${key}";
      $valuesRow[$j] .= ":${key}${j}";
      $and = true;
    }
    $i += 1;
  }

  $values .= implode('), (', $valuesRow) . ')';

  $query .= ")" . $values. " ON DUPLICATE KEY UPDATE id=id"; // TODO make sure id is always primary

  $req = $bdd->prepare($query);

  $j = 0;
  foreach ($rows as $i => $row) {
    foreach ($row as $key => $value) {
      if ($key === 'id') continue;
      $type = PDO::PARAM_STR;
      if (is_bool($value)) {
        $type = PDO::PARAM_BOOL;
      } elseif (is_int($value)) {
        $type = PDO::PARAM_INT;
      } elseif (is_array($value)) {
        $value = json_encode($value);
      }
      $req->bindValue(":${key}${j}", $value, $type);
    }
    $j += 1;
  }

  if ($req->execute()) {
    set_last_interaction($bdd, $GLOBALS['userId']);
    return $rows;
  } else {
    throw new Exception("add_row: insert was unsuccessful -- " . $query . " " . $req->errorInfo()[2], 1);
  }

}


function table_alter_to_match($bdd, $table, $rowsToCheck) {
  try {
    if (!isAssoc($rowsToCheck)) {
      $rowsToCheck = $rowsToCheck[0];
      if (!isAssoc($rowsToCheck)) {
        throw new Exception("table_alter_to_match: invalid rows.", 1);
      }
    }

    $query = "SELECT COLUMN_NAME FROM information_schema.columns
              WHERE table_schema = :dbname AND table_name = :table";
    $req = prepare_and_execute($bdd, $query, ['dbname' => $GLOBALS['DB_NAME'], 'table' => $table]);
    $rowsInDb = $req->fetchAll(PDO::FETCH_ASSOC);

    $columns = [];
    foreach ($rowsInDb as $key => $row) {
      $columns[] = $row['COLUMN_NAME'];
    }

    $toAdd = [];
    $add = "";
    foreach ($rowsToCheck as $key => $value) {
      if (!in_array($key, $columns)) {
        // a key is not in the columns, alter the table.
        $toAdd[] = $add . "ADD COLUMN ${key} " . type_from_value($value);
        $add = ", ";
      }
    }

    if ($add !== "") {
      // at least one column to add
      // build the query
      $query = "ALTER TABLE ${table} " . implode($toAdd);

      // execute the query
      $req = prepare_and_execute($bdd, $query);
    }
  } catch (Exception $e) {
    throw new Exception("table_alter_to_match: error ". $e['message'], 1);
  }
}

function is_existing_table($bdd, $table) {
  $query = "SHOW TABLES LIKE :table";

  $req = $bdd->prepare($query);
  $req->bindParam(":table", $table);
  $req->execute();

  $count = $req->rowCount();
  if ($count == 1) {
    return true;
  }

  return false;
}

function table_exists_or_create($bdd, $table, $rows) {
  if (is_existing_table($bdd,$table)) {
    if ($GLOBALS['_SHOULD_ALTER_TABLES']) {
        table_alter_to_match($bdd, $table, $rows);
    }
    return true;
  } else {
    if ($GLOBALS['_SHOULD_CREATE_TABLES']) {

      if (!isAssoc($rows)){
        $rows = $rows[0];
        if (!isAssoc($rows)) {
          throw new Exception("table_exists_or_create: invalid rows", 1);
        }
      }

      // create table based on the rows
      $query = "CREATE TABLE ${table} (";

      $add = false;
      $primary = false;
      foreach ($rows as $key => $value) {
        if ($add) {
          $query .= ", ";
        }

        if ($key === 'id') {
          $primary = true;
          $query .= "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT";
        } else {
          $query .= $key." ".type_from_value($value);
        }

        $add = true;
      }
      if (!$primary) {
        if ($add) {
          $query .= ", ";
        }
        $query .= "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT";
      }
      $query .= ");";

      $req = $bdd->prepare($query);
      if ($req->execute()) {
        return true;
      } else {
        throw new Exception("table_exists_or_create: table creation was unsuccessful -- " . $req->errorInfo()[2], 1);
      }

    }
  }

}

function type_from_value($value) {
  if (is_int($value)) {
    return "BIGINT";
  } elseif (is_bool($value)) {
    return "BOOL";
  }
  return "TEXT";
}

function add_csv($bdd, $table, $csvFile) {

  /* TODO
  LOAD DATA INFILE 'data.txt' INTO TABLE tbl_name
  IGNORE
  FIELDS TERMINATED BY ',' ENCLOSED BY '"'
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;
  */
}

function is_valid_query() {
  // TODO protect against query complexity
}

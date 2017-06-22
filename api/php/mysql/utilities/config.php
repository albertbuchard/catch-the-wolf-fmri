<?php
/*

  Replace ...xxx... with your specific parameters.

 */

 /* INTERFACES */
 $_INTERFACE_REST = 'rest';
 $_INTERFACE_GRAPHQL = 'graphql';
 $_INTERFACE_WEBSOCKET = 'websocket';

 /*--- REST API ---*/
 /* Database configuration */
 /* mysql -u monty -p cwfmri */
 $DB_HOST = 'localhost';//'Alberts-MacBook-Pro.local'; //':tmp/mysql.sock';//
 $DB_NAME = 'cwfmri';
 $DB_USER = 'root';
 $DB_PASS = 'az4444';

 /* Query endpoints */
 $_QUERY_ADD = 'add';
 $_QUERY_LOGIN = 'login';
 $_QUERY_SIGNUP = 'signup';
 $_QUERY_GET_CHECKPOINT = 'getCheckpoint';
 $_QUERY_SET_CHECKPOINT = 'setCheckpoint';
 $_QUERY_HAS_CHECKPOINT = 'hasCheckpoint';

 /* Api configuration */
 $_SHOULD_CREATE_USERS_ON_LOGIN = true;
 $_SHOULD_CREATE_TABLES = true;
 $_SHOULD_ALTER_TABLES = true;
 $_SHOULD_SET_USERID_FOR_ALL_ADD = true;
 $_USE_LOG_IP = true;
 $_USE_SESSIONS = false;
 $_LOGKEY_EXPIRES_IN = 86400000; // 1 day in ms

  /* String constants */
 $_NO_CHECKPOINT = 'none';
 $_TABLE_CHECKPOINTS = 'checkpoints';
 $_SHOULD_CHECK_TASK_END = true;
 $_CHECKPOINT_TASKEND = 'taskEndNoComeback';
 $_SHOULD_CHECK_LAST_INTERACTION = true;
 $_MAXIMUM_TIME_AWAY = 20*60*1000;
 /*--- SURVEYS ---*/
 $SURVEY_ROOT = "http://brainandlearning.org/limesurvey/index.php/survey/index/sid/";

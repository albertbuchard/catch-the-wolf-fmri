<?php

	ini_set('display_errors', 0);

	if (file_exists('./api/php/mysql/utilities/config.dev.php')) {
	  require_once "./api/php/mysql/utilities/config.dev.php";
	} else {
	  require_once "./api/php/mysql/utilities/config.php";
	}

	require_once "./api/php/mysql/utilities/types.php";
	require_once "./api/php/mysql/utilities/db.php";
	require_once "./api/php/mysql/utilities/rest.php";

	session_start();
	// Connect to the db
	$bdd = connect_to_db();


	//this is the worker ID to identify the subject and the HIT identifier that is needed for successful submission of the HIT to MTurk
	if (isset($_REQUEST["workerId"]) && isset($_REQUEST["assignmentId"])) {
		$_SESSION["subjID"] = $_REQUEST["workerId"];
		set_assignment($bdd, $_REQUEST["workerId"], $_REQUEST["assignmentId"]);

		if($_SERVER["HTTPS"] != "on") {
		    header("Location: https://" . $_SERVER["HTTP_HOST"] . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)."?workerId=".urlencode($_REQUEST["workerId"])."&assignmentId=".urlencode($_REQUEST['assignmentId']));
		    exit();
		}
	} else {
		//if the worker ID is not passed, this means the participant "previewing" the HIT and hasn't accepted it
		$_SESSION["subjID"] = "NA";
	}


?>
<!DOCTYPE html>

<!-- get participant info -->

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Cognitive Science Study</title>

	<script src="node_modules/jquery/dist/jquery.js"></script>
	<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
	<script src="node_modules/tether/dist/js/tether.min.js"></script>
	<script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>

	    <script src="node_modules/experiment-mathjs/dist/math.js"></script>
	    <script src="node_modules/lodash/lodash.js"></script>
	    <script src="node_modules/chartjs/chart.js"></script>

	<script src="node_modules/experiment-babylon-js/lib/babylon.min.js"></script>
	<script src="node_modules/experiment-boxes/lib/experimentBoxes.min.js" charset="utf-8"></script>
	<script src="node_modules/experiment-js/lib/experiment.min.js" charset="utf-8"></script>

	<script>
	if ((location.protocol != 'https:') && (location.host.indexOf("localhost") === -1)) {
	 location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
	}

	<?php
		$userOk = true;
		if ($_SESSION["subjID"] != 'NA') {
			if (user_has_done_experiment($_SESSION["subjID"], $GLOBALS['_FORBIDDEN_EXPTS'])) {
				$userOk = false;
			} else {
				set_done_experiment($_SESSION["subjID"], $GLOBALS['_EXPT_ID']);
	?>

		var subjID = '<?php echo $_SESSION["subjID"] ?>';

		var dataManager = new DataManager();
		dataManager.authorize_manual_login = false;
		var connection;
		var connectAndStart = function (password) {
			dataManager.setConnection({
				endpoint: './api/php/mysql/index.php',
				credentials: {userId: subjID, password: password}
			})
			.then(function (connection) {
				if (connection.loggedIn) {
					window.connection = connection;
					var checkTaskDone = dataManager.query('hasCheckpoint', { checkpoint: 'taskDone' }, connection)
				  var checkTaskEndNoComeback = dataManager.query('hasCheckpoint', { checkpoint: 'taskEndNoComeback'}, connection)
					return Promise.all([checkTaskDone, checkTaskEndNoComeback])
				}
				return Promise.reject('There was an error during login.')
			})
			.then(function(checkpoints) {
				for (const checkpoint of checkpoints) {
		      if (typeof checkpoint.code === 'undefined') {
		        return Promise.reject('Connection error.')
		      } else if ((checkpoint.code === 'taskDone') || (checkpoint.code === 'taskEndNoComeback')) {
						$("#finishDiv").show();
						$("#consentAndSubmit").hide();
		        return Promise.reject('Task has already ended with message: ' + checkpoint.message+'<br>It is not possible to pass it twice.')
		      }
		    }
		    // TODO open pop up and start task
				var popup = window.open('./index.html',  "_blank", "toolbar=no,scrollbars=no,resizable=no");
				if (popup === null)
				   alert('Please change your popup settings');
				else  {
				  popup.moveTo(0, 0);
				  popup.resizeTo(screen.width, screen.height);
					$("#finishDiv").show();
					$("#consentAndSubmit").hide();
				}

			})
			.catch(function (e) {
				var modal = new SmartModal()
				modal.title = 'Login Error'
	  		modal.content = e
			});
		}

		var checkFinishAndSend = function () {
			if ((typeof window.connection !== 'undefined') && window.connection.loggedIn) {
				this.dataManager.query('getFinalCode', null, this.connection)
	      .then((r) => {
					if (r.code) {
						document.getElementById('assignmentId').value = r.code;
						document.getElementById('results').submit();
					} else {
						return Promise.reject('You did not finish the task properly.')
					}

	      })
				.catch(function (e) {
					var modal = new SmartModal()
					modal.title = 'Error'
		  		modal.content = e
				});
			} else {
				var modal = new SmartModal()
				modal.title = 'Error'
				modal.content = 'You must finish the task before you can submit.'
			}

		}

		document.addEventListener('DOMContentLoaded', function() {
			var form = document.getElementById('results');
        if (document.referrer && ( document.referrer.indexOf('workersandbox') != -1) ) {
            form.action = "https://workersandbox.mturk.com/mturk/externalSubmit";
        }


			document.getElementById('startTaskButton').addEventListener('click', function () {
				var password = document.getElementById('password').value
				var consent = document.getElementById('consentcx').checked
				if (password.length < 6) {
					var modal = new SmartModal();
					modal.title = 'Password too short';
		  		modal.content = 'Please enter a password longer than 6 character.';
				} else if (!consent) {
					var modal = new SmartModal();
					modal.title = 'Consent';
		  		modal.content = 'Please indicate that you have read and understood the information and consent to do the task (click on the checkbox).';
			  }else {
					connectAndStart(password);
				}
			});

			document.getElementById('submitButton').addEventListener('click', function () {
				checkFinishAndSend();
			});


		});

	<?php }} ?>
	</script>

</head>

<body>
<div class="container">
	<div class="col-md-12 centered"><h2>Cognitive Science Study</h2></div>
	<div class="col-md-12 container">
		<!-- provides a message to let the participant know they're done, or if they can't continue with the study -->
		<div id="accept-alert" class="col-md-12 alert alert-warning hidden"></div>

		<!-- most of the content below is filled in by the js code based on the progress the participant has made -->
		<div id="content" class="col-md-12">
			<!-- if there is no experiment ID defined, we can't show a list of tasks that need to be completed -->
				<!-- TODO this text is filled in by text from the assets/expt_info.json file -->
				<span id="description-text"></span>

				<!-- this tells the participant what task number they are on (basically a status update) -->
				<span id="next-task"></span>

				<!-- this displays a full list of the tasks the participant needs to complete -->
				<div id="tasks" class="panel-group" id="accordion" role="tablist" >
					<!--task info inserted by js -->
				</div>

				<?php if (!$userOk) { ?>
					<p>
 					 It seems you have already participated in one of our studies that had some elements in common with this one.
					 This might give you an advantage in terms of performance, recruiting you for this study might bias our results.
					 We had no way of knowing before you accepted the HIT (your id is not given to us before that), and we appologize for any inconvenience.
 				 </p>

 				 <p>
 					 <strong>Again we appologize for the incovenience, please return the HIT.</strong>
 				 </p>
				<!-- this appears only if the participant hasn't accepted the HIT yet -->
				<?php } elseif ($_SESSION["subjID"] == "NA") { ?>
					<!-- we need to get the participant's consent before they start each task -->
						<span id="consentAndSubmit" >
					<p>
						You must read and understand <a target="_blank" href="./assets/media/information.pdf">the consent form</a>
						before participating. <strong>You must also be between 18 and 75 years of age.</strong>
					</p>

					<p>
						<strong>Please only accept the HIT if you plan to complete all portions of it.</strong>
					</p>

					<p><strong>The task lasts between 1 hour and 2 hours depending on the breaks you take and is paid 12$ after completion</strong></p>

					<p>Screenshot:<br><br>
						<center><img src="./assets/images/screenshot.png" alt="In-game screenshot"></center>

					</p>

						</span>


				<!-- otherwise have the participant confirm they read the consent form, and show a button that takes them to the task -->
				<?php } else { ?>
					<span id="consentAndSubmit" >
					<p>To start the task, you must first agree that you have read and understood
						<a target="_blank" href="./assets/media/information.pdf">the consent form</a>
						and you certify that you are between 18 and 75 years of age.
					</p>

				    <p>
				    	<input type="checkbox" name="consent" id="consentcx" /> <label for="consentcx">
				    	I have read and understood the consent form. I certify that I am between 18 and 75 years of age.</label>
				    </p>

					<!-- this will open up an external window to the task page -->
					<p>First pick a password:</p>
					<p><input type="text" id="password" value="minimum 6 character"></p>
					<p><button type="button" class="btn btn-primary btn-lg" id="startTaskButton">Start the Task</button></p>

					<p>(A new tab/window will open. <strong>Please disable your pop-up blocker in order to continue!
						You may also need to enable third-party cookies.</strong>)</p>
				</span>
				</div>

				<div id="finishDiv" class="col-md-12" style="display:none;">
					<p>When you are finished and you have verified your completion at the end of the task, you may submit this HIT.</p>

					<p>If you have any comments or feedback, please leave them in the box below.</p>

					<!-- this form is important for paying participants: we need to pass back to MTurk the assignment ID as
					verification that the participant completed the task. You need to also make sure you which which URL you are
					submitting the form to, depending if you're using the MTurk sandbox, or are using the live MTurk site.

					The extra values get stored in the *.results file, which you can retrieve via the MTurk CLT getResults.cmd script -->

					<form id="results" name="results" method="post" action="https://www.mturk.com/mturk/externalSubmit">
				<!--<form id="results" name="results" method="post" action="https://workersandbox.mturk.com/mturk/externalSubmit">-->
						<input type="hidden" name="assignmentId" id="assignmentId" value="" />
						<input type="hidden" name="task" id="task" value="NA" />
						<textarea id="comments" name="comments" rows="4" cols="60"></textarea><br/>

						<!-- this submit button only becomes active when they start the task. When a participant presses this button, it also
						checks to see if they have actually completed the task (based on records in the database). If they haven't, it displays
						a pop-up error message. -->
					</form>
					<button type="button" class="btn btn-primary btn-lg" name="submitButton" id="submitButton">Submit HIT</button>

				<?php } ?>
			</div>


			<div class="col-md-12">
				<p>Please contact <a href="mailto:bavelier.lab@gmail.com">bavelier.lab@gmail.com</a> if you have any questions.</p>
				<!-- this check if the participant's browser supports an HTML5 canvas -->
				<canvas width="1" height="1">
					<p><strong>NOTE:</strong> If you see this message, your browser does not support the HTML5 canvas element.
					Please update your browser to the latest version so that you can participate in these studies!</p>
					<p>Common Browsers:
					<ul>
					<li><a href="https://www.google.com/intl/en/chrome/browser/">Google Chrome</a></li>
					<li><a href="http://www.mozilla.org/en-US/firefox/update/">Mozilla Firefox</a></li>
					</ul>
					</p>
				</canvas>
			</div>
		</div>
	</div>
</div>





</body>


</html>

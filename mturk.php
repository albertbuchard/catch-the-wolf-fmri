<!DOCTYPE html>

<!-- get participant info -->
<?php
	ini_set('display_errors', 0);
	require_once './api/php/mysql/utilities.php';
	session_start();
	// Connect to the db
	$bdd = connect_to_db();


	//this is the worker ID to identify the subject and the HIT identifier that is needed for successful submission of the HIT to MTurk
	if (isset($_REQUEST["workerId"])) {
		$_SESSION["subjID"] = $_REQUEST["workerId"];
		set_assignment($bdd, $_REQUEST["workerId"], $_REQUEST["assignmentId"]); 
	}
	//if the worker ID is not passed, this means the participant "previewing" the HIT and hasn't accepted it
	else {
		$_SESSION["subjID"] = "NA";
		$_SESSION["assignmentId"] = "NA";
	}
?>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Cognitive Science Study</title>

	<!-- css -->
	<link href="./css/bootstrap.min.css" type="text/css" rel="stylesheet" />
	<link href="./style.css" type="text/css" rel="stylesheet" />

	<!-- js libraries -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script type="text/javascript" src="./js_utils/bootstrap.min.js"></script>

	<script src="node_modules/experiment-boxes/lib/experimentBoxes.min.js" charset="utf-8"></script>
	<script src="node_modules/experiment-js/lib/experiment.min.js" charset="utf-8"></script>

	<!-- participant info to be passed to javascript -->
	<script>
	var subjID = '<?php echo $_SESSION["subjID"] ?>';


	var dataManager = new DataManager();
	var connection;
	var connectAndStart = function (password) {
		window.connection = dataManager.setConnection({
			endpoint: './api/php/mysql/index.php',
			credentials: {userId: subjID, password: password}
		})
		.then(function (connection) {
			if (connection.loggedIn) {
				var checkTaskDone = dataManager.query('hasCheckpoint', { checkpoint: R.get.checkpoint_taskDone }, this.connection)
			  var checkTaskEndNoComeback = dataManager.query('hasCheckpoint', { checkpoint: R.get.checkpoint_taskEndNoComeback }, this.connection)
				return Promise.all([checkTaskDone, checkTaskEndNoComeback])
			}
			return Promise.reject('There was an error during login.')
		})
		.then(function(checkpoints) {
			for (const result of results) {
	      if (typeof result.code === 'undefined') {
	        return Promise.reject('Connection error.')
	      } else if ((result.code === R.get.checkpoint_taskDone) || (result.code === R.get.checkpoint_taskEndNoComeback)) {
	        return Promise.reject('Task has already ended with message: ' + result.message+'<br>It is not possible to pass it twice.')
	      }
	    }
	    // TODO open pop up and start task
	    window.open('data:application/json;' + (window.btoa ? 'base64,' + btoa(stringified) : stringified), "ParamBox.save", "width=400,height=" + height);
			var popup = window.open('./index.html',  "_blank", "toolbar=no,scrollbars=no,resizable=yes");
			if (popup === null)
			   alert('Please change your popup settings');
			else  {
			  popup.moveTo(0, 0);
			  popup.resizeTo(screen.width, screen.height);
			}

		})
		.catch(function (e) {
			var modal = new SmartModal()
			modal.title = 'Login Error'
  		modal.content = e
		});
	}

	var checkFinishAndSend = function () {
		if (connection.loggedIn) {
			this.dataManager.query('getFinalCode', null, this.connection)
      .then((r) => {
				if (r.code) {
					document.getElementById('assignmentId').value = r.code;
					document.getElementById('results').submit();
				} else {
					return Promise.reject('You did not finish the task !')
				}

      })
			.catch(function (e) {
				var modal = new SmartModal()
				modal.title = 'Error'
	  		modal.content = e
			});
		}
	}

	document.addEventListener('DOMContentLoaded', function() {
		document.getElementById('startTaskButton').addEventListener('click', function () {
			var password = document.getElementById('password').text
			if (password.length < 6) {
				var modal = new SmartModal();
				modal.title = 'Password too short';
	  		modal.content = 'Please enter a password longer than 6 character.';
			} else {
				connectAndStart(password);
			}
		});

		document.getElementById('submitButton').addEventListener('click', function () {
			checkFinishAndSend();
		});


	});


	</script>

</head>

<body>
	<h2>Cognitive Science Study</h2>

	<!-- provides a message to let the participant know they're done, or if they can't continue with the study -->
	<div id="accept-alert" class="alert alert-warning"></div>

<!-- most of the content below is filled in by the js code based on the progress the participant has made -->
<div id="content">
	<!-- if there is no experiment ID defined, we can't show a list of tasks that need to be completed -->
	<?php if ($_SESSION["exptId"] == "NA") { ?>
	<div>
		<p>You need to specify an experiment batch in order to continue.</p>
	</div>
	<?php } else { ?>
		<!-- this text is filled in by text from the assets/expt_info.json file -->
		<div id="description-text"></div>

		<!-- this tells the participant what task number they are on (basically a status update) -->
		<p id="next-task"></p>

	<!-- this displays a full list of the tasks the participant needs to complete -->
	<div id="tasks" class="panel-group" id="accordion" role="tablist">
		<!--task info inserted by js -->
	</div>

	<!-- we need to get the participant's consent before they start each task -->
	<div id="consent-and-submit">
		<!-- this appears only if the participant hasn't accepted the HIT yet -->
		<?php if ($_SESSION["subjID"] == "NA") { ?>
			<p>
				You must read and understand <a target="_blank" href="./assets/doc/Information_Letter.pdf">the consent form</a>
				before participating. <strong>You must also be between 18 and 75 years of age.</strong>
			</p>

			<p>
				<strong>Please only accept the HIT if you plan to complete all portions of it.</strong>
			</p>

		<!-- otherwise have the participant confirm they read the consent form, and show a button that takes them to the task -->
		<?php } else { ?>
			<p>To start the task, you must first agree that you have read and understood
				<a target="_blank" href="./assets/doc/Information_Letter.pdf">the consent form</a>
				and you certify that you are between 18 and 75 years of age.
			</p>

		    <p>
		    	<input type="checkbox" name="consent" id="consentcx" /> <label for="consentcx">
		    	I have read and understood the consent form. I certify that I am between 18 and 75 years of age.</label>
		    </p>

			<!-- this will open up an external window to the task page -->
			<p>First pick a password:</p>
			<p><input type="text" name="password" value="minimum 6 character"></p>
			<p><button type="button" class="btn btn-primary btn-lg" id="startTaskButton">Start the Task</button></p>

			<p>(A new tab/window will open. <strong>Please disable your pop-up blocker in order to continue!
				You may also need to enable third-party cookies.</strong>)</p>

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

		<br/>
		<!-- if the participant hasn't completed the task yet but tries to submit the HIT, a warning message pops up -->
		<div id="submit-alert" class="alert alert-warning"></div>
	</div>

	<div>
		<p>Please contact bavelier.lab@gmail.com if you have any questions.</p>
	</div>


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

<?php } ?>
</div>


</body>


</html>

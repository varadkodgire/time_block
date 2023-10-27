const timersContainer = document.getElementById('timers');
const addTimerButton = document.getElementById('addTimerButton');

// Call createNewTimer when the page loads
createNewTimer();

addTimerButton.addEventListener('click', createNewTimer);

function createNewTimer() {
  const timerElement = document.createElement('div');
  timerElement.className = 'timer';
  
  const activityName = document.createElement('input');
  activityName.type = 'text';
  activityName.placeholder = 'Activity Name';
  
  const toggleButton = document.createElement('button');
  toggleButton.textContent = 'Start';
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete'; // Add the "Delete" text

  const timerDisplay = document.createElement('div');
  timerDisplay.className = 'timerDisplay';
  
  let startTime = null;
  let intervalId = null;
  let elapsedTime = 0;
  let isRunning = false;

  function toggleTimer() {
    if (isRunning) {
      clearInterval(intervalId);
      isRunning = false;
      toggleButton.textContent = 'Start';
    } else {
      startTime = new Date().getTime() - elapsedTime * 1000;
      intervalId = setInterval(updateTimeDisplay, 1000);
      isRunning = true;
      toggleButton.textContent = 'Stop';
    }
  }

  function deleteTimer() {
    timersContainer.removeChild(timerElement); // Remove the timer element
  }

  function updateTimeDisplay() {
    if (startTime) {
      const currentTime = new Date().getTime();
      elapsedTime = (currentTime - startTime) / 1000;
      timerDisplay.textContent = `${formatTime(elapsedTime)}`;
    }
  }
  
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    seconds = Math.floor(seconds % 60);
    return `${hours}h:${minutes}m:${seconds}s`;
  }
  
  toggleButton.addEventListener('click', toggleTimer);
  deleteButton.addEventListener('click', deleteTimer); // Add click event for delete button
  
  timerElement.appendChild(activityName);
  timerElement.appendChild(toggleButton);
  timerElement.appendChild(deleteButton); // Add the delete button
  timerElement.appendChild(timerDisplay);
  
  timersContainer.appendChild(timerElement);
  
  // Initially display the timer with elapsed time
  timerDisplay.textContent = `${formatTime(elapsedTime)}`;
}

const timersContainer = document.getElementById('timers');
const addTimerButton = document.getElementById('addTimerButton');

// Call a function to load timers from localStorage on page load
loadTimers();

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
    timersContainer.removeChild(timerElement);
    // Call a function to save the updated timers to localStorage
    saveTimers();
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
    return `${hours}h${minutes}m${seconds}s`;
  }

  toggleButton.addEventListener('click', toggleTimer);
  deleteButton.addEventListener('click', deleteTimer);
  
  timerElement.appendChild(activityName);
  timerElement.appendChild(toggleButton);
  timerElement.appendChild(deleteButton);
  timerElement.appendChild(timerDisplay);
  
  timersContainer.appendChild(timerElement);

  // Call a function to save the updated timers to localStorage
  saveTimers();
}

function saveTimers() {
  const timers = [];
  const timerElements = timersContainer.querySelectorAll('.timer');

  timerElements.forEach((timerElement) => {
    // Extract timer data from each timer element
    const activityName = timerElement.querySelector('input').value;
    const timerDisplay = timerElement.querySelector('.timerDisplay').textContent;
    timers.push({ activityName, timerDisplay });
  });

  // Save the timers to localStorage as a JSON string
  localStorage.setItem('timers', JSON.stringify(timers));
}

function loadTimers() {
  // Retrieve timers from localStorage
  const storedTimers = localStorage.getItem('timers');

  if (storedTimers) {
    const timers = JSON.parse(storedTimers);

    // Create timer elements based on the stored data
    timers.forEach((timerData) => {
      const timerElement = document.createElement('div');
      timerElement.className = 'timer';

      const activityName = document.createElement('input');
      activityName.type = 'text';
      activityName.value = timerData.activityName; // Set the saved activity name

      const toggleButton = document.createElement('button');
      toggleButton.textContent = 'Start';

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';

      const timerDisplay = document.createElement('div');
      timerDisplay.className = 'timerDisplay';
      timerDisplay.textContent = timerData.timerDisplay; // Set the saved timer display

      timerElement.appendChild(activityName);
      timerElement.appendChild(toggleButton);
      timerElement.appendChild(deleteButton);
      timerElement.appendChild(timerDisplay);

      timersContainer.appendChild(timerElement);
    });
  }
}

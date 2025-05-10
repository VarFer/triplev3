document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const taskNameInput = document.getElementById('taskName');
  const taskTableBody = document.getElementById('taskTableBody');

  const pomodoroDurationInput = document.getElementById('pomodoroDuration');
  const shortBreakDurationInput = document.getElementById('shortBreakDuration');
  const longBreakDurationInput = document.getElementById('longBreakDuration');

  const pomodoroTimerDisplay = document.getElementById('pomodoroTimer');
  const pomodoroStatusDisplay = document.getElementById('pomodoroStatus');

  const startPomodoroButton = document.getElementById('startPomodoro');
  const pausePomodoroButton = document.getElementById('pausePomodoro');
  const resetPomodoroButton = document.getElementById('resetPomodoro');

  // Obtener tareas del localStorage, si existen
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  let pomodoroTimer = null;  // Intervalo del temporizador
  let isPomodoroActive = false;
  let currentTimeInSeconds = parseInt(pomodoroDurationInput.value) * 60;
  let isOnBreak = false;
  let pomodoroCount = 0; // Contador de Pomodoros completados

  // Función para mostrar las tareas en la tabla
  function renderTasks() {
    taskTableBody.innerHTML = ''; // Limpiar la tabla antes de actualizar

    tasks.forEach((task, index) => {
      const row = document.createElement('tr');

      // Crear columna con nombre de la tarea
      const taskCell = document.createElement('td');
      const taskLabel = document.createElement('span');
      taskLabel.textContent = task.name;
      taskCell.appendChild(taskLabel);

      // Crear una celda para los botones de editar y eliminar
      const actionsCell = document.createElement('td');

      // Botón Editar
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2'); // 'me-2' es para agregar espacio entre los botones
      editButton.addEventListener('click', () => editTask(index, taskLabel));
      actionsCell.appendChild(editButton);

      // Botón Eliminar
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
      deleteButton.addEventListener('click', () => deleteTask(index));
      actionsCell.appendChild(deleteButton);

      // Añadir la celda de acciones (Editar/Eliminar) a la fila
      row.appendChild(taskCell);
      row.appendChild(actionsCell);

      taskTableBody.appendChild(row);
    });
  }

  // Función para editar una tarea
  function editTask(index, taskLabel) {
    // Crear un input con el valor actual de la tarea
    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskLabel.textContent;
    input.classList.add('form-control', 'form-control-sm');

    // Reemplazar el label por el input
    taskLabel.replaceWith(input);

    // Crear un botón "Guardar" para confirmar el cambio
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.classList.add('btn', 'btn-success', 'btn-sm');
    saveButton.addEventListener('click', () => saveTask(index, input));

    // Añadir el botón "Guardar" junto al input
    input.insertAdjacentElement('afterend', saveButton);
  }

  // Función para guardar la tarea editada
  function saveTask(index, input) {
    const updatedTaskName = input.value.trim();
    if (updatedTaskName !== '') {
      tasks[index].name = updatedTaskName; // Actualizar el nombre de la tarea
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar los cambios en localStorage
      renderTasks(); // Volver a renderizar las tareas
    }
  }

  // Función para agregar una tarea
  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskName = taskNameInput.value.trim(); // Eliminar espacios innecesarios
    if (taskName) {
      tasks.push({ name: taskName }); // Agregar tarea al array
      taskNameInput.value = ''; // Limpiar el campo de entrada
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar tareas en localStorage
      renderTasks(); // Volver a renderizar las tareas
    }
  });

  // Función para eliminar una tarea
  function deleteTask(index) {
    tasks.splice(index, 1); // Eliminar la tarea del array
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar los cambios en localStorage
    renderTasks(); // Volver a renderizar las tareas
  }

  // Función que actualiza el temporizador en el DOM
  function updateTimerDisplay() {
    const minutes = Math.floor(currentTimeInSeconds / 60);
    const seconds = currentTimeInSeconds % 60;
    pomodoroTimerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Función para iniciar el Pomodoro
  function startPomodoro() {
    if (pomodoroTimer !== null) return;  // No iniciar si ya está activo

    isPomodoroActive = true;
    pomodoroStatusDisplay.textContent = "Estado: En progreso";
    startPomodoroButton.disabled = true;
    pausePomodoroButton.disabled = false;
    resetPomodoroButton.disabled = false;

    pomodoroTimer = setInterval(() => {
      if (currentTimeInSeconds > 0) {
        currentTimeInSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(pomodoroTimer);
        pomodoroTimer = null;
        pomodoroStatusDisplay.textContent = "Estado: En pausa";
        startPomodoroButton.disabled = false;
        pausePomodoroButton.disabled = true;

        // Cuando el Pomodoro termina
        if (!isOnBreak) {
          alert('¡Pomodoro terminado! Tiempo de descanso.');

          // Aumentar el contador de Pomodoros completados
          pomodoroCount++;

          // Determinar si es una pausa corta o larga
          if (pomodoroCount % 4 === 0) {
            // Pausa larga después de 4 Pomodoros
            currentTimeInSeconds = parseInt(longBreakDurationInput.value) * 60;
            alert('¡Tiempo de descanso largo!');
          } else {
            // Pausa corta después de cada Pomodoro
            currentTimeInSeconds = parseInt(shortBreakDurationInput.value) * 60;
            alert('¡Tiempo de descanso corto!');
          }

          isOnBreak = true;
        } else {
          alert('¡Descanso terminado! Comienza otro Pomodoro.');
          isOnBreak = false;
          currentTimeInSeconds = parseInt(pomodoroDurationInput.value) * 60;
        }

        updateTimerDisplay();
      }
    }, 1000);
  }

  // Función para pausar el Pomodoro
  function pausePomodoro() {
    if (pomodoroTimer !== null) {
      clearInterval(pomodoroTimer);
      pomodoroTimer = null;
      pomodoroStatusDisplay.textContent = "Estado: Pausado";
      startPomodoroButton.disabled = false;
      pausePomodoroButton.disabled = true;
    }
  }

  // Función para reiniciar el Pomodoro
  function resetPomodoro() {
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;
    isOnBreak = false;
    pomodoroCount = 0; // Resetear el contador de Pomodoros
    currentTimeInSeconds = parseInt(pomodoroDurationInput.value) * 60;
    updateTimerDisplay();
    pomodoroStatusDisplay.textContent = "Estado: En pausa";
    startPomodoroButton.disabled = false;
    pausePomodoroButton.disabled = true;
    resetPomodoroButton.disabled = true;
  }

  // Mostrar el tiempo inicial
  updateTimerDisplay();

  // Agregar event listeners para los botones de Pomodoro
  startPomodoroButton.addEventListener('click', startPomodoro);
  pausePomodoroButton.addEventListener('click', pausePomodoro);
  resetPomodoroButton.addEventListener('click', resetPomodoro);

  // Cargar las tareas al iniciar la página
  renderTasks();
});

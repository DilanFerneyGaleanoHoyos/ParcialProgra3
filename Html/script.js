
fetch('departments.json')
  .then(response => response.json())
  .then(departments => {
    
    const departamentoSelect = document.getElementById('departamento');
    departments.forEach(department => {
      const option = document.createElement('option');
      option.value = department.name; 
      option.textContent = department.name;
      departamentoSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error loading departments data:', error);
  });


fetch('towns.json')
  .then(response => response.json())
  .then(municipalities => {
    
    const municipioSelect = document.getElementById('municipio');
    municipalities.forEach(municipality => {
      const option = document.createElement('option');
      option.value = municipality.name; 
      option.textContent = municipality.name;
      municipioSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error loading municipalities data:', error);
  });


let empleados = [];
function toggleEmployeeStatus(id) {
  const employee = empleados.find(emp => emp.id === id);
  if (employee) {
    employee.activo = !employee.activo; 
    guardarEmpleadosEnLocalStorage();
    mostrarEmpleados();
  }
}


function addEmployee(employee) {
  empleados.push(employee);
  guardarEmpleadosEnLocalStorage();
  mostrarEmpleados();
}


if (localStorage.getItem('empleados')) {
  empleados = JSON.parse(localStorage.getItem('empleados'));
}
const formulario = document.querySelector('form');
const tablaEmpleados = document.getElementById('tablaEmpleados');
let idCounter = empleados.length > 0 ? empleados[empleados.length - 1].id + 1 : 1;

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  const apellidos = document.getElementById('apellidos').value || 'Default Apellidos';
  const nombres = document.getElementById('nombres').value || 'Default Nombres';
  const departamento = document.getElementById('departamento').value || 'Default Departamento';
  const municipio = document.getElementById('municipio').value || 'Default Municipio';
  const fechaNacimiento = document.getElementById('fechaNacimiento').value || 'Default Fecha de Nacimiento';
  const salario = document.getElementById('salario').value || 'Default Salario';
  const empleado = {
    id: idCounter++,
    apellidos,
    nombres,
    departamento,
    municipio,
    fechaNacimiento,
    salario,
    activo: true, 
  };
  addEmployee(empleado); 
  formulario.reset();
});

function mostrarEmpleados() {
  tablaEmpleados.innerHTML = '';
  empleados.forEach((empleado) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${empleado.id}</td>
      <td>${empleado.apellidos}</td>
      <td>${empleado.nombres}</td>
      <td>${empleado.departamento}</td>
      <td>${empleado.municipio}</td>
      <td>${empleado.fechaNacimiento}</td>
      <td>${empleado.salario}</td>
   
    `;
    tablaEmpleados.appendChild(fila);
  });
}

function guardarEmpleadosEnLocalStorage() {
  localStorage.setItem('empleados', JSON.stringify(empleados));
}



function openEditModal(id) {
  const employee = empleados.find(emp => emp.id === id);
  if (employee) {
    // Populate the edit form with employee details
    document.getElementById('editApellidos').value = employee.apellidos;
    document.getElementById('editNombres').value = employee.nombres;
    document.getElementById('editDepartamento').value = employee.departamento;
    document.getElementById('editMunicipio').value = employee.municipio;
    document.getElementById('editFechaNacimiento').value = employee.fechaNacimiento;
    document.getElementById('editSalario').value = employee.salario;

    // Show the Bootstrap modal
    $('#editModal').modal('show');
  }
}

// Add a function to save employee changes from the modal
function saveEmployeeChanges() {
  const id = getIdFromEditForm(); // Implement this function to get the employee ID from the modal form
  const employee = empleados.find(emp => emp.id === id);
  if (employee) {
    employee.apellidos = document.getElementById('editApellidos').value;
    employee.nombres = document.getElementById('editNombres').value;
    employee.departamento = document.getElementById('editDepartamento').value;
    employee.municipio = document.getElementById('editMunicipio').value;
    employee.fechaNacimiento = document.getElementById('editFechaNacimiento').value;
    employee.salario = document.getElementById('editSalario').value;

    guardarEmpleadosEnLocalStorage();
    mostrarEmpleados();

    // Close the Bootstrap modal
    $('#editModal').modal('hide');
  }
}
function getIdFromEditForm() {
  const modal = document.getElementById('editModal');
  if (modal) {
    // Assuming that your modal contains an input field with an ID of 'editEmployeeId'
    const idInput = modal.querySelector('#editEmployeeId');
    if (idInput) {
      const id = parseInt(idInput.value);
      return id;
    }
  }
  // If the ID couldn't be found or extracted, return null or some default value.
  return null;
}

function mostrarEmpleados() {
  tablaEmpleados.innerHTML = '';
  empleados.forEach((empleado) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${empleado.id}</td>
      <td>${empleado.apellidos}</td>
      <td>${empleado.nombres}</td>
      <td>${empleado.departamento}</td>
      <td>${empleado.municipio}</td>
      <td>${empleado.fechaNacimiento}</td>
      <td>${empleado.salario}</td>
      <td>${empleado.activo ? 'Activo' : 'Inactivo'}</td>
      <td>
        <button class="btn btn-primary" onclick="toggleEmployeeStatus(${empleado.id})">Estado</button>
        <button class="btn btn-primary" onclick="editEmployee(${empleado.id})">Editar</button>
      </td>
    `;
    tablaEmpleados.appendChild(fila);
  });
}
mostrarEmpleados();
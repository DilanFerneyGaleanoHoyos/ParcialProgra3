
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



function editEmployee(id) {
  const employee = empleados.find(emp => emp.id === id);
  if (employee) {

    document.getElementById('apellidos').value = employee.apellidos;
    document.getElementById('nombres').value = employee.nombres;
    document.getElementById('departamento').value = employee.departamento;
    document.getElementById('municipio').value = employee.municipio;
    document.getElementById('fechaNacimiento').value = employee.fechaNacimiento;
    document.getElementById('salario').value = employee.salario;
    
   
    document.querySelector('button[type="submit"]').setAttribute('disabled', 'true');


    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar Cambios';
    saveButton.classList.add('btn', 'btn-primary');
    saveButton.addEventListener('click', () => {
      employee.apellidos = document.getElementById('apellidos').value;
      employee.nombres = document.getElementById('nombres').value;
      employee.departamento = document.getElementById('departamento').value;
      employee.municipio = document.getElementById('municipio').value;
      employee.fechaNacimiento = document.getElementById('fechaNacimiento').value;
      employee.salario = document.getElementById('salario').value;
      guardarEmpleadosEnLocalStorage();
      mostrarEmpleados();
     
      formulario.reset();
      saveButton.remove();

      document.querySelector('button[type="submit"]').removeAttribute('disabled');
    });

    formulario.appendChild(saveButton);
  }
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

function openEmployeeDetailsModal(employee) {
  const modalTitle = document.getElementById('employeeDetailsModalLabel');
  const modalBody = document.getElementById('employeeDetails');

  modalTitle.textContent = `Detalles del Empleado #${employee.id}`;
  modalBody.innerHTML = `
    <p>Apellidos: ${employee.apellidos}</p>
    <p>Nombres: ${employee.nombres}</p>
    <p>Departamento: ${employee.departamento}</p>
    <p>Municipio: ${employee.municipio}</p>
    <p>Fecha de Nacimiento: ${employee.fechaNacimiento}</p>
    <p>Salario: ${employee.salario}</p>
    <p>Estado: ${employee.activo ? 'Activo' : 'Inactivo'}</p>
  `;

  $('#employeeDetailsModal').modal('show');
}

document.getElementById('searchButton').addEventListener('click', () => {
  const searchId = parseInt(document.getElementById('searchInput').value);
  const foundEmployee = empleados.find(emp => emp.id === searchId);

  if (foundEmployee) {
    openEmployeeDetailsModal(foundEmployee);
  } else {
    alert('Empleado no encontrado. Por favor, intente con otro ID.');
  }
});


mostrarEmpleados();
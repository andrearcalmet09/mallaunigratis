document.addEventListener("DOMContentLoaded", () => {
  fetch("otic.json")
    .then((res) => res.json())
    .then((cursos) => {
      crearVistaOTI(cursos);
    });
});

function crearVistaOTI(cursos) {
  const container = document.getElementById("otic-container");
  const totalEl = document.getElementById("total-aprobados");
  let totalAprobados = 0;

  cursos.forEach((curso) => {
    const divCurso = document.createElement("div");
    divCurso.className = "curso-otic";
    divCurso.textContent = curso.nombre;

    // Estado inicial desde localStorage
    const cursoId = `otic-${curso.nombre}`;
    if (localStorage.getItem(cursoId) === "true") {
      divCurso.classList.add("aprobado");
      totalAprobados += 1;
    }

    // Al hacer clic: alternar aprobado
    divCurso.addEventListener("click", () => {
      divCurso.classList.toggle("aprobado");
      const aprobado = divCurso.classList.contains("aprobado");
      localStorage.setItem(cursoId, aprobado);

      totalAprobados += aprobado ? 1 : -1;
      totalEl.textContent = `✅ Cursos completados: ${totalAprobados}`;
    });

    container.appendChild(divCurso);
  });

  totalEl.textContent = `✅ Cursos completados: ${totalAprobados}`;
}


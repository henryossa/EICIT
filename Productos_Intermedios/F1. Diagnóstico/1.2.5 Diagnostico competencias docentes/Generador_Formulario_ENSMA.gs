/**
 * GENERADOR DEL FORMULARIO DE DIAGNÓSTICO DE COMPETENCIAS DIGITALES DOCENTES — ENSMA
 * Fase 1 · Tarea F1-T5 · Acompañamiento EICIT a la actualización del PEI
 * Autor: EICIT IA
 *
 * CÓMO USARLO
 * 1. Entra a https://script.google.com con la cuenta institucional (Google Workspace).
 * 2. Nuevo proyecto > pega este código completo > Guardar.
 * 3. Ejecuta la función crearFormularioDiagnostico() y autoriza los permisos.
 * 4. En el registro (Ver > Registro de ejecución) aparecerá el enlace de edición del formulario.
 *    Revísalo, ajústalo si hace falta y compártelo con los docentes tras el aval de la ENSMA.
 *
 * Notas:
 * - El bloque objetivo (Sección 8) queda en modo cuestionario con 1 punto por respuesta correcta.
 * - Las escalas Likert se presentan como cuadrículas (una pantalla por sección) para agilizar el diligenciamiento.
 * - Los ítems inversos están marcados con /*I*​/ para el análisis; NO se muestran como tales al docente.
 */

function crearFormularioDiagnostico() {
  var form = FormApp.create('Diagnóstico de Competencias Digitales Docentes — ENSMA (Línea Base)');

  form.setDescription(
    'Este cuestionario busca conocer las competencias digitales del equipo docente de la ENSMA para orientar el ' +
    'acompañamiento y la formación en el marco de la actualización del PEI. Tiene fines formativos y de planeación; ' +
    'no es una evaluación de desempeño ni tiene efectos sancionatorios. Sus datos se tratan conforme a la Ley 1581 ' +
    'de 2012 y se cruzan únicamente con la caracterización docente institucional para diseñar la formación. ' +
    'Tomará entre 30 y 40 minutos. Le agradecemos responder con sinceridad.'
  );

  try { form.setCollectEmail(true); } catch (e) {}
  try { form.setLimitOneResponsePerUser(true); } catch (e) {}
  form.setProgressBar(true);
  form.setIsQuiz(true);
  form.setShowLinkToRespondAgain(false);

  var LIKERT = ['1', '2', '3', '4', '5'];
  var ANCLAS = '1 = Totalmente en desacuerdo · 2 = En desacuerdo · 3 = Ni de acuerdo ni en desacuerdo · 4 = De acuerdo · 5 = Totalmente de acuerdo';

  function grid(titulo, filas) {
    form.addGridItem().setTitle(titulo).setHelpText(ANCLAS)
      .setRows(filas).setColumns(LIKERT).setRequired(true);
  }
  function seccion(titulo, ayuda) {
    var pb = form.addPageBreakItem().setTitle(titulo);
    if (ayuda) pb.setHelpText(ayuda);
  }

  // ---------- SECCIÓN 0 · CONSENTIMIENTO (página inicial) ----------
  form.addMultipleChoiceItem()
    .setTitle('Autorizo el tratamiento de mis datos para los fines descritos y participo de manera voluntaria.')
    .setChoiceValues(['Sí', 'No'])
    .setRequired(true);

  // ---------- SECCIÓN 1 · IDENTIFICACIÓN Y CONTEXTO ----------
  seccion('Sección 1 · Identificación y contexto',
    'El nombre y el correo son la llave para cruzar este diagnóstico con la caracterización docente.');
  form.addTextItem().setTitle('Nombre completo').setRequired(true);
  form.addTextItem().setTitle('Correo institucional (llave de cruce)').setRequired(true);
  form.addCheckboxItem().setTitle('Nivel(es) en que enseña principalmente')
    .setChoiceValues(['Preescolar', 'Primaria', 'Secundaria', 'Media']).setRequired(true);
  form.addListItem().setTitle('Área o asignatura principal')
    .setChoiceValues(['Ciencias Naturales', 'Ciencias Sociales', 'Matemáticas', 'Humanidades / Lengua Castellana',
      'Idioma Extranjero', 'Tecnología e Informática', 'Educación Artística', 'Educación Física',
      'Educación Religiosa', 'Ética y Valores', 'Preescolar', 'Otra']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Años de experiencia docente')
    .setChoiceValues(['Menos de 3', '3 a 10', '11 a 20', 'Más de 20']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Dispositivo con el que trabaja habitualmente')
    .setChoiceValues(['Computador propio', 'Computador institucional', 'Solo teléfono', 'Sin dispositivo estable']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Conectividad para su trabajo docente')
    .setChoiceValues(['Estable', 'Intermitente', 'Limitada']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Formación previa en tecnología educativa')
    .setChoiceValues(['Ninguna', 'Informal o autodidacta', 'Cursos cortos', 'Posgrado o certificación formal']).setRequired(true);

  // ---------- SECCIÓN 2 · ACTITUD ----------
  seccion('Sección 2 · Actitud frente a la innovación y la tecnología');
  grid('Indique su grado de acuerdo con cada afirmación', [
    'Integrar tecnología en mi práctica mejora los aprendizajes de mis estudiantes.',
    'Me siento capaz de aprender a usar nuevas herramientas digitales por mi cuenta.',
    'Los cambios tecnológicos frecuentes me generan agobio o rechazo.', /*I*/
    'Estoy dispuesto/a a dedicar tiempo a formarme en innovación y tecnología educativa.',
    'La tecnología debe estar al servicio del desarrollo integral de la persona, y no al revés.',
    'Prefiero mis métodos habituales antes que incorporar nuevas herramientas digitales.', /*I*/
    'Veo la inteligencia artificial más como una oportunidad que como una amenaza para la educación.',
    'Me siento cómodo/a experimentando con recursos digitales aunque no domine todo desde el inicio.',
    'La innovación educativa es responsabilidad de toda la institución, no solo de algunas personas.'
  ]);

  // ---------- SECCIÓN 3 · INFORMACIÓN Y DATOS ----------
  seccion('Sección 3 · Información y datos digitales');
  grid('Indique su grado de acuerdo con cada afirmación', [
    'Busco información en internet con criterios y filtros avanzados (operadores, fuentes especializadas).',
    'Evalúo la fiabilidad y el posible sesgo de las fuentes digitales antes de usarlas o recomendarlas.',
    'Organizo y almaceno mis recursos digitales de forma sistemática (carpetas, nube, nomenclatura).',
    'Uso hojas de cálculo para organizar o analizar datos de mis estudiantes.',
    'Enseño a mis estudiantes a buscar y evaluar información digital de forma crítica.'
  ]);
  form.addMultipleChoiceItem().setTitle('¿Con qué frecuencia usa recursos digitales para preparar sus clases?')
    .setChoiceValues(['Nunca', 'Mensual', 'Semanal', 'Diario']).setRequired(true);

  // ---------- SECCIÓN 4 · COMUNICACIÓN Y CONTENIDOS ----------
  seccion('Sección 4 · Comunicación, colaboración y creación de contenidos');
  grid('Indique su grado de acuerdo con cada afirmación', [
    'Uso herramientas digitales para comunicarme con estudiantes y familias (correo, plataforma, mensajería institucional).',
    'Colaboro con colegas mediante documentos o espacios compartidos en línea.',
    'Creo mis propios materiales digitales (presentaciones, documentos, infografías).',
    'Produzco o edito recursos multimedia (audio, video o imágenes) para mis clases.',
    'Uso plataformas o aulas virtuales para gestionar actividades y entregas.'
  ]);
  form.addMultipleChoiceItem().setTitle('¿Con qué frecuencia utiliza un aula virtual o plataforma con sus estudiantes?')
    .setChoiceValues(['Nunca', 'Mensual', 'Semanal', 'Diario']).setRequired(true);

  // ---------- SECCIÓN 5 · SEGURIDAD Y CIUDADANÍA ----------
  seccion('Sección 5 · Seguridad y ciudadanía digital');
  grid('Indique su grado de acuerdo con cada afirmación', [
    'Protejo mis cuentas con prácticas seguras (contraseñas robustas, verificación en dos pasos).',
    'Sé cómo proteger los datos personales de mis estudiantes conforme a la normativa de habeas data.',
    'Reconozco situaciones de ciberacoso entre estudiantes y sé cómo actuar frente a ellas.',
    'Oriento a mis estudiantes sobre su huella digital y su identidad en línea.',
    'Promuevo un uso saludable y equilibrado de las pantallas (bienestar digital).',
    'Identifico correos, enlaces o mensajes potencialmente fraudulentos (phishing).',
    'Conozco las medidas institucionales de entornos seguros de aprendizaje digital.'
  ]);

  // ---------- SECCIÓN 6 · INTEGRACIÓN PEDAGÓGICA ----------
  seccion('Sección 6 · Integración pedagógica de las TIC');
  grid('Indique su grado de acuerdo con cada afirmación', [
    'Diseño actividades de aprendizaje que integran tecnología con un propósito pedagógico claro.',
    'Uso tecnología para atender los distintos ritmos y necesidades de mis estudiantes.',
    'Empleo herramientas digitales para evaluar y retroalimentar los aprendizajes.',
    'Aplico metodologías activas apoyadas en tecnología (aprendizaje por proyectos, gamificación, aula invertida).',
    'Selecciono recursos digitales alineados con los objetivos y estándares de mi área.',
    'Reflexiono sobre mi uso de la tecnología y lo ajusto según los resultados de aprendizaje.',
    'Diseño experiencias en las que los estudiantes crean con tecnología y no solo la consumen.'
  ]);

  // ---------- SECCIÓN 7 · INTELIGENCIA ARTIFICIAL ----------
  seccion('Sección 7 · Inteligencia artificial');
  grid('Indique su grado de acuerdo con cada afirmación', [
    'Comprendo, a grandes rasgos, qué es la inteligencia artificial generativa y cómo funciona.',
    'He usado herramientas de IA para preparar clases o materiales educativos.',
    'Sé formular instrucciones (prompts) efectivas para obtener buenos resultados de una IA.',
    'Puedo identificar errores, sesgos o invenciones («alucinaciones») en las respuestas de una IA.',
    'Conozco criterios éticos para usar IA con estudiantes (integridad académica, privacidad, transparencia).',
    'Puedo diseñar actividades en las que los estudiantes usen IA de forma crítica y responsable.',
    'Me siento preparado/a para orientar a colegas en el uso pedagógico de la IA.',
    'Me interesa formarme en el uso pedagógico de la inteligencia artificial.'
  ]);
  form.addCheckboxItem().setTitle('Temas de IA que le gustaría priorizar en la formación')
    .setChoiceValues(['Fundamentos', 'Creación de materiales', 'Evaluación y retroalimentación',
      'Ética e integridad', 'Uso con estudiantes', 'Herramientas específicas']).setRequired(false);

  // ---------- SECCIÓN 8 · BLOQUE OBJETIVO (CUESTIONARIO) ----------
  seccion('Sección 8 · Situaciones prácticas',
    'Elija la opción más adecuada en cada situación. Esta sección permite contrastar la percepción con la práctica.');

  var objetivas = [
    ['Encuentra una página con datos llamativos, sin autor ni fecha. ¿Qué hace?',
      ['Verifico autoría y fecha, y contrasto con fuentes oficiales antes de usarla.',
       'La comparto porque los datos son interesantes.',
       'La uso si aparece de primera en el buscador.',
       'La descarto solo si el diseño se ve poco profesional.'], 0],
    ['Para buscar una frase exacta en un buscador, lo más eficaz es:',
      ['Escribir la frase entre comillas.',
       'Escribir la frase en mayúsculas.',
       'Agregar signos de admiración.',
       'Repetir las palabras varias veces.'], 0],
    ['Recibe un correo de la «rectoría» que exige, con urgencia, su usuario y contraseña por un enlace. Usted:',
      ['No hace clic y verifica por un canal institucional oficial.',
       'Responde de inmediato para no perder el acceso.',
       'Hace clic para revisar si el enlace es real.',
       'Reenvía el correo a sus colegas por si acaso.'], 0],
    ['¿Cuál es la práctica más segura para sus cuentas?',
      ['Una contraseña larga y única por servicio, con verificación en dos pasos.',
       'La misma contraseña sencilla en todos los servicios.',
       'Anotar las contraseñas en un archivo de texto sin clave.',
       'Cambiar de contraseña solo si olvida la anterior.'], 0],
    ['Quiere publicar fotos de sus estudiantes en una red social. Lo correcto es:',
      ['No hacerlo sin autorización de tratamiento de datos de los acudientes.',
       'Publicarlas si el colegio se ve bien.',
       'Publicarlas sin etiquetar el nombre del colegio.',
       'Publicarlas solo entre semana.'], 0],
    ['Una IA le entrega una cita bibliográfica que, al verificar, no existe. A esto se le llama:',
      ['Alucinación del modelo; siempre hay que verificar.',
       'Un error de conexión a internet.',
       'Una fuente premium bloqueada.',
       'Un formato de cita distinto al usual.'], 0],
    ['¿Qué NO debería escribir en una herramienta de IA pública y gratuita?',
      ['Datos personales identificables de sus estudiantes.',
       'Una pregunta general sobre didáctica.',
       'Un tema para generar ideas de clase.',
       'Una solicitud de ejemplos de actividades.'], 0],
    ['¿Cuál instrucción a una IA suele dar mejores resultados?',
      ['Una específica, con contexto, formato y objetivo claros.',
       'Una muy corta y general.',
       'Una escrita en mayúsculas.',
       'Una que repita la misma orden tres veces.'], 0],
    ['Un estudiante entrega como propio un texto hecho en su totalidad por una IA. La respuesta más adecuada es:',
      ['Convertirlo en oportunidad formativa: enseñar uso ético y exigir transparencia y citación del uso de IA.',
       'Anular la nota sin más y cerrar el tema.',
       'Ignorarlo porque es difícil de comprobar.',
       'Prohibir toda tecnología en el curso.'], 0]
  ];

  objetivas.forEach(function (q) {
    var item = form.addMultipleChoiceItem();
    item.setTitle(q[0]).setPoints(1).setRequired(true);
    var choices = q[1].map(function (texto, i) { return item.createChoice(texto, i === q[2]); });
    item.setChoices(choices);
  });

  Logger.log('Formulario creado.');
  Logger.log('Editar: ' + form.getEditUrl());
  Logger.log('Responder: ' + form.getPublishedUrl());
}

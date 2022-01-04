// WEB DESIGN 2021 - PROJETO 2
// Elisa Sampaio, Luana Barbosa, Márcia Lopes, Vera Vasconcelos

// Olá mundo!
console.log("Hello world!");

// Ir para o LOGIN -------------------------------------------------------------
$("#btnstart").click(function () {
  $("#registerpage").css({ "display": "none" });
  $("#intro").css({ "display": "none" });
  $("#loginpage").css({ "display": "block" });
});

// Ir para a main page depois do LOGIN
$("#btnenter").click(function () {
  $("#loginpage").css({ "display": "none" });
  $("#mainpage").css({ "display": "block" });
  $("header").css({ "display": "block" });
  $("#bg-circles").css({ "display": "block" });

  // adicionar o nome do user em questão, no main
  // solução para capitalizar a primeira letra em: https://flexiple.com/javascript-capitalize-first-letter/
  let user = $('#selectUser').find(":selected").text();
  const str = user;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  $("#username").text(str2);
});

// Ir para o REGISTER ----------------------------------------------------------
$("#btnregister").on("click", function () {

  $("#intro").css({ "display": "none" });
  $("#registerpage").css({ "display": "block" });

  // fazer reset aos campos de texto
  $("#nameinput").val("");
  $("#ageinput").val("");
  $("#jobinput").val("");
});

// Event listener para gravar o registo
$("#savebtn").on("click", saveUser);

// REGISTER -- Guardar o utilizador
function saveUser() {
  $("#registerpage").css({ "display": "none" });
  $("#mainpage").css({ "display": "block" });
  $("header").css({ "display": "block" });
  $("#bg-circles").css({ "display": "block" });

  console.log("estou aqui");
  let user;
  let users;
  let n = $("#nameinput").val();
  let a = $("#ageinput").val();
  let j = $("#jobinput").val();

  // adicionar o nome do user em questão no main
  // solução para capitalizar a primeira letra em: https://flexiple.com/javascript-capitalize-first-letter/
  const str = n;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  console.log(str2);
  $("#username").text(str2);

  // construir o objeto
  user = { name: n, age: a, job: j };
  console.log(user);

  // ver se existe algo na localStorage
  if (localStorage.getItem("users") != null) {
    // se existir, ler a local storage
    let JSONusers = localStorage.getItem("users");

    // transformar o conteúdo num objeto
    users = JSON.parse(JSONusers);

  } else {
    // se não existir nada ainda, criar o array
    users = [];
    console.log("no users");
  }

  // pôr o novo user dentro do Array
  users.push(user);

  // preparar para gravar a lista de novo
  let JSONusers = JSON.stringify(users);

  // gravar na localStorage
  localStorage.setItem("users", JSONusers);
}

// REGISTER -- Adicionar o utilizador
function addUser() {
  let users;
  let user;

  // ver se existe algo na localStorage
  if (localStorage.getItem("users") == null) {
    console.log("no users registered");
  } else {

    // se existir, ler a local storage
    let JSONusers = localStorage.getItem("users");
    users = JSON.parse(JSONusers);

    // adicionar os users existentes à página
    users.forEach(function (user) {
      let person = $(`<option>${user.name}</option>`);
      $("#selectUser").append(person);
    });
  }
}

$("#btnstart").on("click", addUser);


// NAVEGAÇÃO RESTANTE  ---------------------------------------------------------
// MAIN -- Mostrar os records
$("#btnrecords").on("click", function () {

  let j = document.querySelector("#records");

  if (j.style.top == "100vh") {
    j.style.top = "80px";
    //esconder o nome do utilizador
    $("#username").delay(300).hide(0);
    //esconder o menuToggle
    $("#menuToggle").delay(300).hide(0);

  } else {
    j.style.top = "100vh";
    //mostrar o nome do utilizador
    $("#username").show(0);
    //mostrar o menuToggle
    $("#menuToggle").show(0);
  }
});

// Hamburguer menu open/close {
// $("#menu-box").on("click", function () {
//   $("#menuToggle").children("ul").toggle();
// });

$("#menu-box").on("click", function () {
  $("#menuToggle").children("ul").toggle();
  $("#menu-box").children("span").toggle();
  console.log('hello');
});

// QUIZ PAGE -- Navegação
$("#quiz").on("click", function () {
  $("#quizpage").css({ "display": "block" });
  $("#mainpage").css({ "display": "none" });
  $("#personalpage").css({ "display": "none" });
  $("#aboutpage").css({ "display": "none" });

  // .prop() encontrado em: https://stackoverflow.com/questions/17420534/check-uncheck-checkbox-using-jquery
  $("#checkbox").prop('checked', false);

  // voltar para a vista default dos circles (mostra o último record)
  $("#weekly-circles").hide();
  $("#bg-circles").show();

});

// HOME PAGE -- Navegação
$("#home").on("click", function () {
  $("#mainpage").css({ "display": "block" });
  $("#quizpage").css({ "display": "none" });
  $("#personalpage").css({ "display": "none" });
  $("#aboutpage").css({ "display": "none" });

  $("#checkbox").prop('checked', false);
});

// PERSONAL PAGE -- Navegação
$("#personal").on("click", function () {
  $("#personalpage").css({ "display": "block" });
  $("#mainpage").css({ "display": "none" });
  $("#quizpage").css({ "display": "none" });
  $("#aboutpage").css({ "display": "none" });

  $("#checkbox").prop('checked', false);
});

// ABOUT PAGE -- Navegação
$("#about").on("click", function () {
  $("#aboutpage").css({ "display": "block" });
  $("#mainpage").css({ "display": "none" });
  $("#quizpage").css({ "display": "none" });
  $("#personalpage").css({ "display": "none" });

  $("#checkbox").prop('checked', false);
});


// FUNÇÕES A CORRER NO LOAD DA PÁGINA ------------------------------------------
$(document).ready(function () {
  // adicionar as entries da localStorage
  addEntries();
  // adicionar os records da localStorage
  addRecord();
  // adicionar os círculos do quizz com a última resposta
  addCircles();
});

// PERSONAL PAGE ---------------------------------------------------------------
//PERSONAL PAGE -- Guardar as entradas
$("#save-box").on("click", function () {

  let entries;
  let entrytext = $(".personal-entry").html();
  // console.log(entrytext);

  // ir buscar a data atual
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth()+1;
  let yyyy = now.getFullYear();

  let today = dd + '.' + mm + '.' + yyyy;

  // pôr a data num string para esta não se alterar
  let todayString = today.toString();

  // criar um objeto das entradas
  entry = {date: todayString, text: entrytext};

  // ver se existe na localStorage
  if (localStorage.getItem("entries") != null) {
    // se existir, ler a local storage
    let JSONentries = localStorage.getItem("entries");
    entries = JSON.parse(JSONentries);

  } else {
    // se não existir nada ainda, criar o array
    entries = [];
    console.log("no entries");
  }



  // se o utilizador não tiver escrito nada, não é possível guardar
  if (entrytext == "-&gt;") {
    console.log('nothing was written..ups');
  } else {
    // pôr a entrada dentro do Array
    entries.push(entry);

    // preparar para gravar a lista de novo
    let JSONentries = JSON.stringify(entries);

    // gravar na localStorage
    localStorage.setItem("entries", JSONentries);

    // por fim, adicionar as entradas na página
    addEntries();
  }
});

//PERSONAL PAGE -- Adicionar as entradas
function addEntries() {

  // fazer o reset do conteúdo
  $(".entradas").html("");

  let entries;

  if (localStorage.getItem("entries") == null) {
  } else {
    // se existirem entradas, ler a local storage
    let JSONentries = localStorage.getItem("entries");
    entries = JSON.parse(JSONentries);

    // reverter a ordem do array para aparecerem do mais recente para mais antigo
    entries.reverse();

    // adicionar as entradas na página
    entries.forEach(function (entry) {
      $(".entradas").append(`<p class="new-entry"> <span class="p-date">${entry.date}</span> <br>${entry.text}</p>`);
    });
  }

  // adiciona o símbolo para o utilizador saber onde escrever
  $(".personal-entry").text("->");
}


// QUIZ PAGE -------------------------------------------------------------------
$("#savebtnQuiz").on("click", createRecord);

// declaração da variável para incrementar mais tarde
var i = -1;

// QUIZ PAGE -- Criar os Records
function createRecord() {

  // esconder o quiz e ir para a main page
  $("#quizpage").css({ "display": "none" });
  $("#mainpage").css({ "display": "block" });
  $("#records").css({ "top": "100vh" });

  // criar um record e guardar na localStorage
  // recolher as respostas ao quiz em variáveis
  let record;
  let records;

  // Fazer com que o string de texto tenha a primeira letra maiúscula
  let day = $("#textareainput1").html();
  let q1 = day.charAt(0).toUpperCase() + day.slice(1);

  let q2 = '❤️ ' + $('#selectHowAreYouFeeling').find(":selected").text();

  let q3 = '🌙 ' + $('#selectHowDidYouSleep').find(":selected").text();

  let q4 =  '🤸 ' + $('#selectDidYouExercised').find(":selected").text();

  // Fazer com que o string de texto tenha a primeira letra maiúscula
  let social = $("#textareainput2").html();
  let q5 = social.charAt(0).toUpperCase() + social.slice(1);

  // ir buscar a data atual
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth()+1;
  let yyyy = now.getFullYear();

  let today = dd + '.' + mm + '.' + yyyy;

  // pôr a data num string para esta não se alterar
  let todayString = today.toString();

  // criar um objeto dos records
  record = {date: todayString, day: q1 , feel: q2, sleep: q3, exercise: q4 , social: q5};

  // ver se existe já na localStorage
if (localStorage.getItem("records") != null) {
  // se existir, ler a local storage
  let JSONrecords = localStorage.getItem("records");

  // transforma o conteúdo num objeto
  records = JSON.parse(JSONrecords);
} else {
  // se não existir nada ainda, criar o array
  records = [];
  console.log("no records");
}

// pôr o novo user dentro do Array
records.push(record);

// preparar para gravar a lista de novo
let JSONrecords = JSON.stringify(records);

// gravar na localStorage
localStorage.setItem("records", JSONrecords);
console.log(record);

// código seguinte inspirado em: https://stackoverflow.com/questions/28362404/how-to-delete-a-specific-item-object-in-localstorage?rq=1

  // Código para adicionar apenas um record por dia
  // se não existir nenhum record adiciona à página
  if (records.length == 1) {
    addRecord();
    console.log('first record added!');
  } else {}

  // incrementar um valor sempre que a função correr
  i++;

  // ir buscar à localStorage
  let JSONrecords3 = localStorage.getItem("records");
  records = JSON.parse(JSONrecords3);

  // se a data de hoje for igual à de um record...
  if (record.date == todayString) {
  // console.log('o numero é ' + i);

  if (i == 0) {
    // se for o primeiro record do dia, adicionar
    addRecord();

  } else if (i >= 1 ) {
    // se já não for o primeiro
    // buscar o penúltimo valor do array
    let rLength = records.length;
    let pos = rLength - 2;
    // e eliminar-lo
    records.splice(pos, 1);
    console.log('Quiz replaced!');

    // voltar a pôr na localStorage
    let JSONrecords2 = JSON.stringify(records);
    localStorage.setItem("records", JSONrecords2);

    // fazer update nos records
    addRecord();
  } else {}

  } else if (record.date != todayString) {
    // se a data não for igual, adiciona o record
    addRecord();
    console.log('The date is different! New record added.');
  } else {}
}

// QUIZ PAGE -- Adicionar os Records
function addRecord() {
  let records;
  let record;

  // fazer reset dos campos de resposta
  $('#textareainput1').html("");
  $('#selectHowAreYouFeeling').val("");
  $('#selectHowDidYouSleep').val("");
  $('#selectDidYouExercised').val("");
  $('#textareainput2').html("");

  // verificar se existem records
  if (localStorage.getItem("records") == null) {
  } else {
    // se existirem, ler o local storage
    let JSONrecords = localStorage.getItem("records");
    records = JSON.parse(JSONrecords);

    // reverter a ordem para aparecer do mais recente para o mais antigo
    records.reverse();

    // fazer o reset do html, caso exista qualquer coisa
    $("#records_day").html("");

    // adicionar os records à página
    records.forEach(function (record) {
      let newRecord = $(`<div class="newRecord">
        <p class="p-date">${record.date}</p>
        <p>${record.day}</p>
        <p>${record.feel}</p>
        <p>${record.sleep}</p>
        <p>${record.exercise}</p>
        <p>${record.social}</p>
        </div>`);
      $("#records_day").append(newRecord);
    });
  }
}

//QUIZ -- Adicionar os CIRCLES à página no load
function addCircles() {

  // ver se existe na localStorage -- getItem funciona como um loop q seleciona tudo
  if (localStorage.getItem("records") != null) {

    // ler o local storage
    let JSONrecords = localStorage.getItem("records");
    records = JSON.parse(JSONrecords);

    // ir buscar o último record
    let rLength = records.length;
    let last = rLength - 1;
    // console.log(last);

    // vai buscar o último record e adiciona na página o circulo correspondente
    for (var i = 0; i < records.length; i++) {

      // Questão 2: dependendo do valor a cor é diferente
      if (records[last].feel == "Happy") {
        pageloadCircles('#F7921E');
      } else if (records[last].feel == "Confident") {
        pageloadCircles('#990000');
      } else if (records[last].feel == "Bored") {
        pageloadCircles('#4C311E');
      } else if (records[last].feel == "Anxious") {
        pageloadCircles('#136D00');
      } else if (records[last].feel == "Sad") {
        pageloadCircles('#0093BA');
      } else {}

      // Questão 3: dependendo do valor a cor é diferente
      if (records[last].sleep == "Very good") {
        pageloadCircles1('#C475B0');
      } else if (records[last].sleep == "Good") {
        pageloadCircles1('#B2469E');
      } else if (records[last].sleep == "Okay") {
        pageloadCircles1('#8E2577');
      } else if (records[last].sleep == "Bad") {
        pageloadCircles1('#6C1E5D');
      } else if (records[last].sleep == "Very bad") {
        pageloadCircles1('#4A1B56');
      } else {}

      // Questão 4: dependendo do valor a cor é diferente
      if (records[last].exercise == "A lot") {
        pageloadCircles2('#81C341');
      } else if (records[last].exercise == "Yes") {
        pageloadCircles2('#BEC631');
      } else if (records[last].exercise == "A little bit") {
        pageloadCircles2('#FFC200');
      } else if (records[last].exercise == "Maybe tomorrow") {
        pageloadCircles2('#FF5B00');
      } else if (records[last].exercise == "No") {
        pageloadCircles2('#ED2024');
      } else {}
    }
  } else {
    console.log("no records to display");
  }
}

// Adicionar das cores do último record no load da página 1
function pageloadCircles(color) {
  let ellipse = document.querySelector('.div');
  ellipse.style.background = color;

  //percursos diferentes para cada circulo
  let h = $(window).height();
  let w = $(window).width();

  function caminho(myclass) {
    function makeNewPosition() {
      let nh = Math.floor(Math.random() * h) - 100;
      let nw = Math.floor(Math.random() * w) - 100;
      return [nh, nw];
    }

    let newq = makeNewPosition()

    $(myclass).animate({ top: newq[0], left: newq[1] }, 5000, function () {
      caminho(myclass);
    });
  }

  $(document).ready(function () {
    caminho('#mouseCircle'); // atribuir 1 caminho a cada circulo
  });
}

// Adicionar das cores do último record no load da página 2
function pageloadCircles1(color) {
  let ellipse = document.querySelector('.div1');
  ellipse.style.background = color;

  //percursos diferentes para cada circulo
  let h = $(window).height();
  let w = $(window).width();

  function caminho(myclass) {
    function makeNewPosition() {
      let nh = Math.floor(Math.random() * h) - 100;
      let nw = Math.floor(Math.random() * w) - 100;
      return [nh, nw];
    }

    let newq = makeNewPosition()

    $(myclass).animate({ top: newq[0], left: newq[1] }, 5000, function () {
      caminho(myclass);
    });
  }

  $(document).ready(function () {
    caminho('#mouseCircle1'); // atribuir 1 caminho a cada circulo
  });
}

// Adicionar das cores do último record no load da página 3
function pageloadCircles2(color) {
  let ellipse = document.querySelector('.div2');
  ellipse.style.background = color;

  //percursos diferentes para cada circulo
  let h = $(window).height();
  let w = $(window).width();

  function caminho(myclass) {
    function makeNewPosition() {
      let nh = Math.floor(Math.random() * h) - 100;
      let nw = Math.floor(Math.random() * w) - 100;
      return [nh, nw];
    }

    let newq = makeNewPosition()

    $(myclass).animate({ top: newq[0], left: newq[1] }, 5000, function () {
      caminho(myclass);
    });
  }

  $(document).ready(function () {
    caminho('#mouseCircle2'); // atribuir 1 caminho a cada circulo
  });
}


// Adicionar das cores no quiz 1
function changeColor(getColor) {
  let ellipse = document.querySelector('.div');
  let selectColor = getColor.value;
  ellipse.style.background = selectColor;

  // Cor aleatória para a elipse difusa
  let cursorColor = selectColor;

  // FUNÇÕES ------------------------------------------------------------------
  // Cor aleatória para a elipse difusa
  function randomCursorColor() {
    document.querySelector('#mouseCircle').style.background = cursorColor;
    //mouseCircle.setAttribute("style", "z-index=99;");
  }

  randomCursorColor();

  //percursos diferentes para cada circulo
  let h = $(window).height();
  let w = $(window).width();

  function caminho(myclass) {
    function makeNewPosition() {
      let nh = Math.floor(Math.random() * h) - 100;
      let nw = Math.floor(Math.random() * w) - 100;
      return [nh, nw];
    }

    let newq = makeNewPosition()

    $(myclass).animate({ top: newq[0], left: newq[1] }, 5000, function () {
      caminho(myclass);
    });
  }

  $(document).ready(function () {
    caminho('#mouseCircle'); // atribuir 1 caminho a cada circulo
  });
}

// Adicionar das cores no quiz 2
function changeColor1(getColor) {
  let ellipse1 = document.querySelector('.div1');
  let selectColor1 = getColor.value;
  ellipse1.style.background = selectColor1;

  // Cor aleatória para a elipse difusa
  // Math.random retorna um número entre 0 e 1
  let cursorColor = selectColor1;

  // FUNÇÕES ----------------------------------------------------------------------------------------------------------------------------------
  // Cor aleatória para a elipse difusa
  function randomCursorColor() {
    document.querySelector('#mouseCircle1').style.background = cursorColor;
    //mouseCircle1.setAttribute("style", "z-index=99;");
  }

  randomCursorColor();

  $(document).ready(function () {
    caminho('#mouseCircle1'); // atribuir 1 caminho a cada circulo
  });

  //percursos diferentes para cada circulo
  let h = $(window).height();
  let w = $(window).width();

  function caminho(myclass) {
    function makeNewPosition() {
      let nh = Math.floor(Math.random() * h) - 100;
      let nw = Math.floor(Math.random() * w) - 100;
      return [nh, nw];
    }

    let newq = makeNewPosition()

    $(myclass).animate({ top: newq[0], left: newq[1] }, 5000, function () {
      caminho(myclass);
    });
  }
}

// Adicionar das cores no quiz 3
function changeColor2(getColor) {
  let ellipse2 = document.querySelector('.div2');
  let selectColor2 = getColor.value;
  ellipse2.style.background = selectColor2;

  // Cor aleatória para a elipse difusa
  // Math.random retorna um número entre 0 e 1
  let cursorColor = selectColor2;

  // FUNÇÕES -------------------------------------------------------------------
  // Cor aleatória para a elipse difusa
  function randomCursorColor() {
    document.querySelector('#mouseCircle2').style.background = cursorColor;
    //mouseCircle2.setAttribute("style", "z-index=9;");
  }

  randomCursorColor();

  $(document).ready(function () {
    caminho('#mouseCircle2'); // atribuir 1 caminho a cada circulo
  });

  //percursos diferentes para cada circulo
  let h = $(window).height();
  let w = $(window).width();

  function caminho(myclass) {
    function makeNewPosition() {
      let nh = Math.floor(Math.random() * h) - 100;
      let nw = Math.floor(Math.random() * w) - 100;
      return [nh, nw];
    }

    let newq = makeNewPosition()

    $(myclass).animate({ top: newq[0], left: newq[1] }, 5000, function () {
      caminho(myclass);
    });
  }
}

//QUIZ -- Mostrar os records por vista diária (último record/vista default)
$("#daily-view").click(function () {
  $('#bg-circles').show();
  $('#weekly-circles').hide();
});

//QUIZ -- Mostrar os records como vista semanal
$("#weekly-view").on("click", weeklyView);

function weeklyView() {
  //esconder a daily viewport
  $('#bg-circles').hide();
  $('#weekly-circles').show();

  // ver se existe na localStorage -- getItem funciona como um loop q seleciona tudo
  if (localStorage.getItem("records") != null) {

    // ler o local storage
    let JSONrecords = localStorage.getItem("records");
    records = JSON.parse(JSONrecords);

      // se existirem menos de 7 records
      if (records.length <= 7) {
        for (var i = 0; i < records.length; i++) {

          let question = 0;
          // Questão 2: dependendo do valor a cor é diferente
          if (records[i].feel == "Happy") {
            weeklyCircles('#F7921E', question, i);
          } else if (records[i].feel == "Confident") {
            weeklyCircles('#990000', question, i);
          } else if (records[i].feel == "Bored") {
            weeklyCircles('#4C311E', question, i);
          } else if (records[i].feel == "Anxious") {
            weeklyCircles('#136D00', question, i);
          } else if (records[i].feel == "Sad") {
            weeklyCircles('#0093BA', question, i);
          } else {}

          question = 1;
          // Questão 3: dependendo do valor a cor é diferente
          if (records[i].sleep == "Very good") {
            weeklyCircles('#C475B0', question, i);
          } else if (records[i].sleep == "Good") {
            weeklyCircles('#B2469E', question, i);
          } else if (records[i].sleep == "Okay") {
            weeklyCircles('#8E2577', question, i);
          } else if (records[i].sleep == "Bad") {
            weeklyCircles('#6C1E5D', question, i);
          } else if (records[i].sleep == "Very bad") {
            weeklyCircles('#4A1B56', question, i);
          } else {}

          question = 2;
          // Questão 4: dependendo do valor a cor é diferente
          if (records[i].exercise == "A lot") {
            weeklyCircles('#81C341', question, i);
          } else if (records[i].exercise == "Yes") {
            weeklyCircles('#BEC631', question, i);
          } else if (records[i].exercise == "A little bit") {
            weeklyCircles('#FFC200', question, i);
          } else if (records[i].exercise == "Maybe tomorrow") {
            weeklyCircles('#FF5B00', question, i);
          } else if (records[i].exercise == "No") {
            weeklyCircles('#ED2024', question, i);
          } else {}
        }

      // se existir mais do que 7 records, mostrar os 7 últimos
    } else if (records.length >= 8) {
        console.log('more than 7');

        // ir buscar os últimos 7 records
        let rLength = records.length;
        let last = rLength - 8;

        for (var i = last; i < records.length; i++) {

          let question = 0;
          // Questão 2: dependendo do valor a cor é diferente
          if (records[i].feel == "Happy") {
            weeklyCircles('#F7921E', question, i);
          } else if (records[i].feel == "Confident") {
            weeklyCircles('#990000', question, i);
          } else if (records[i].feel == "Bored") {
            weeklyCircles('#4C311E', question, i);
          } else if (records[i].feel == "Anxious") {
            weeklyCircles('#136D00', question, i);
          } else if (records[i].feel == "Sad") {
            weeklyCircles('#0093BA', question, i);
          } else {}

          question = 1;
          // Questão 3: dependendo do valor a cor é diferente
          if (records[i].sleep == "Very good") {
            weeklyCircles('#C475B0', question, i);
          } else if (records[i].sleep == "Good") {
            weeklyCircles('#B2469E', question, i);
          } else if (records[i].sleep == "Okay") {
            weeklyCircles('#8E2577', question, i);
          } else if (records[i].sleep == "Bad") {
            weeklyCircles('#6C1E5D', question, i);
          } else if (records[i].sleep == "Very bad") {
            weeklyCircles('#4A1B56', question, i);
          } else {}

          question = 2;
          // Questão 4: dependendo do valor a cor é diferente
          if (records[i].exercise == "A lot") {
            weeklyCircles('#81C341', question, i);
          } else if (records[i].exercise == "Yes") {
            weeklyCircles('#BEC631', question, i);
          } else if (records[i].exercise == "A little bit") {
            weeklyCircles('#FFC200', question, i);
          } else if (records[i].exercise == "Maybe tomorrow") {
            weeklyCircles('#FF5B00', question, i);
          } else if (records[i].exercise == "No") {
            weeklyCircles('#ED2024', question, i);
          } else {}
        }

      }
  } else {
    console.log('Weekly view operation failed.');
  }
}

// weekly view function
function weeklyCircles(color, question, id) {
  // cria uma div
  $("#weekly-circles").append(`<div class="div${question}${id}"></div>`);

  // seleciona cada div
  let ellipse = document.querySelector(`.div${question}${id}`);
  ellipse.style.background = color;

  //percursos diferentes para cada circulo
  let h = $(window).height();
  let w = $(window).width();

  function caminho(myclass) {
    function makeNewPosition() {
      let nh = Math.floor(Math.random() * h) - 100;
      let nw = Math.floor(Math.random() * w) - 100;
      return [nh, nw];
    }

    let newq = makeNewPosition()

    $(myclass).animate({ top: newq[0], left: newq[1] }, 5000, function () {
      caminho(myclass);
    });
  }

  // pôr as div's em movimento
  caminho(`.div${question}${id}`);
}

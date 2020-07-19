var input = $("input[name='toDo-Input']");
var inputText;
var toDoCount = 0;

//**********
//create to Do listings
//**********

$("input")
    .on("input", function() {
        inputText = input.val();
    })
    .on("keydown", function(e) {
        if (e.keyCode == 13 && inputText != "") {
            toDoCount++;
            $("#toDo-List").prepend(
                '<div class="toDos active"><input type="checkbox" id="toDo' +
                    toDoCount +
                    '" name="toDo' +
                    toDoCount +
                    '"  /><label for="toDo' +
                    toDoCount +
                    '">' +
                    inputText +
                    '</label><div class="delete">X</div></div>'
            );
            input.val("");
        }
    })
    .on("keyup", function(e) {
        if (e.keyCode == 13) {
            input.val("");
            inputText = "";
        }
    });

//**********
//delete listing by clicking X
//**********

$(document).on("click", ".delete", function(e) {
    toDoCount--;
    $(e.target)
        .parent()
        .remove();
});

//**********
//print the tasks toDo footer
//**********

$(document).on("click keydown", function() {
    $(document)
        .find("#itemsLeft")
        .find("span")
        .text(toDoCount);
});

//**********
//check / uncheck tasks
//**********

$("#toDo-List").on("click", "input", function(e) {
    if (
        $(e.target)
            .parent()
            .hasClass("active")
    ) {
        $(e.target)
            .parent()
            .removeClass("active")
            .addClass("completed");
        toDoCount--;
    } else {
        $(e.target)
            .parent()
            .removeClass("completed")
            .addClass("active");
        toDoCount++;
    }
});

//**********
//filter tasks
//**********

$("#itemsSelect").on("click", function(e) {
    var filter = $(e.target).attr("id");
    if (filter == "all") {
        $(e.target)
            .addClass("active")
            .parent()
            .find("#active")
            .removeClass("active")
            .parent()
            .find("#completed")
            .removeClass("active");
        $("#toDo-Wrapper")
            .find(".toDos")
            .show();
    }
    if (filter == "active") {
        $(e.target)
            .addClass("active")
            .parent()
            .find("#all")
            .removeClass("active")
            .parent()
            .find("#completed")
            .removeClass("active");
        $("#toDo-List .completed").toggle();
        $("#toDo-List .active").show();
    }
    if (filter == "completed") {
        $(e.target)
            .addClass("active")
            .parent()
            .find("#all")
            .removeClass("active")
            .parent()
            .find("#active")
            .removeClass("active");
        $("#toDo-List .active").toggle();
        $("#toDo-List .completed").show();
    }
});

//**********
//hide clear completed button when no completed tasks are available
//**********

$(window).on("load click keydown", function() {
    if ($(document).find(".toDos.completed").length > 0) {
        $("#clearCompleted").css("visibility", "visible");
    } else {
        $("#clearCompleted").css("visibility", "hidden");
    }
});

//**********
//clear completed
//**********

$(document).on("click", "#clearCompleted", function() {
    $(document)
        .find(".toDos.completed")
        .remove();
});

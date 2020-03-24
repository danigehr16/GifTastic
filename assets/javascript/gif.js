console.log("hello")

$(document).ready(function () {

    var animals = ["cat", "dog", "parrot", "mouse", "horse", "cow", "frog"]

    

    function displayInfo() {
        $("#gifsHere").empty();
        

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=FGAcnEy80wTvmhfMwUDIFC3UhKqzg7tO&limit=25"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL)
            console.log(response)

            var results = response.data;
            console.log(response.data)
            for (var i = 0; i < results.length; i++) {
                var newAnimalDiv = $("#gifsHere");
                var animalImage = $("<img class='gif'>")
                
                
                console.log(results[i].images)
            
                animalImage.attr("src", results[i].images.fixed_height.url);
                newAnimalDiv.append(animalImage);
                $("#gifsHere").prepend(newAnimalDiv);
            }
        });
    };

    function renderButtons() {
        $(".buttons").empty();

        for (var i = 0; i < animals.length; i++) {
            var createButtons = $("<button>")
            createButtons.addClass("animal btn btn-info");
            createButtons.attr("data-name", animals[i]);
            createButtons.text(animals[i]);
            $(".buttons").append(createButtons);
        }
    }

    $(".gif").on("click" , function() {
        var state = $("<img>").attr("data-state")
        console.log(state)
        if (state === "animate") {
            var animateURL = $(this).attr("data-name")
            $(this).attr("src" , $(this).attr("data-animate"));
            $(this).attr("data-state" , "animate");
        }else {
            $(this).attr("src" , $(this).attr("data-still"));
            $(this).attr("data-state" , "still");
        };
    });

    $("#add-animal").on("click" , function() {
        event.preventDefault();
        var newAnimal = $("#animal-input").val().trim();
        if (animals.indexOf(newAnimal.toLowerCase())!= -1) {
            console.log(animals.toString().toLowerCase().indexOf(newAnimal.toLowerCase()))
            alert("Animal already exists!");
        } else{
            animals.push(newAnimal);
            renderButtons();
        };
    });

   
    $(document).on("click" , ".btn-info" , displayInfo);
    // $(document).on("click" , ".animate-gif" , playGif)

    // look at click animated gif activity

    renderButtons();

});
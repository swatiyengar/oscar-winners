// Read the data
d3.csv("https://gist.githubusercontent.com/gurmanbh/7f24b09ec9da582559c63869ead3d3a3/raw/d33b4387e7a4553ef28bce9c8f047a3adefa8d7c/oscars.csv")
    .then(function(data) {

        // Get a list of years
        // let options = new Set(data.filter(function(movie){
        //   return movie['Winner'] 
        // }).map(function(movie){
        //   return movie.Year
        // }))

        // .map = goes through every data point and says, pull out your year - list comprehension...maps every row of old data set and puts it into the new dataset; then new set creates a new uniquelist from an existing list

        let options = new Set(data.map(d => d.Year))

        //d3 selects our element with year id
        d3.select('#year')
            //Go and select our future "option" with the class "opt"
            .selectAll('option.opt')
            //Bind our data to that selection
            .data(options)
            //Enter to our selection (what lonely options do we have that don't have data associated with them)
            //     .enter()
            //Append those options
            //     .append('option')
            .join('option')
            //Give that option a class
            .attr('class', 'opt')
            //Set the value as d which in this case is the year
            .attr('value', d => d)
            //Set the text as d which in this case in the year
            .text(d => d);

        //Select that button
        d3.select('button')
            //give it an on click event
            .on('click', function() {
                //Select movie sentence
                d3.select('.movie-sentence')
                    //Remove the class hide
                    .classed('hide', false)
                    //Select nomination sentence
                d3.select('.nominations-sentence')
                    //Remove the class hide
                    .classed('hide', false)

                //Get the year value
                const year = d3.select('#year').node().value
                    //Filter the data for year and winner
                const winner = data.filter(d => d.Year === year && d.Winner == 1)
                    //Filter the data for year and nominees; instead of filter you could use FIND which would show the 1st place where the condition is true      
                const nominations = data.filter(d => d.Year === year && d.Winner != 1)

                //Group of nominations to which different elements are added
                //    const group = d3.select('.nominations-sentence')


                //Selects nomination class from HTML
                //     d3.select('.nominations-sentence')
                //     .selectAll('.nomination')
                //Removes existing elemnts at each click
                //     .remove()

                d3.select('.nomination')
                    //Selects nomination class from HTML again (grab everything that is the class of nomination) - every span gets a row of the data
                    .selectAll('.nomination')
                    //Tells d3 what data is about to be bound
                    .data(nominations)
                    //Creates the selection - are some of the data points lonely? only affects the new
                    //    .enter()
                    //Updates the selection such that the correct data elements appear - if lonely, add a span
                    //    .append('span')
                    //    .join removes the need for enter/append unless transitions are involved
                    .join('span')
                    //  gives the data a class
                    .attr('class', 'nomination')
                    //  tells the page to the display an element of the data
                    .text(d => d.Name);


                //  Select the element with the class movie
                d3.select('.movie')
                    //  And set the text as the name of the first element
                    .text(winner[0].Name);
            })
    })
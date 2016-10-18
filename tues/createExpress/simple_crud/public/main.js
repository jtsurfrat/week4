
window.addEventListener('load', function() {
    console.log('- starting up the fronted app');

    // grab the dome element by it's id
    var dom = document.getElementById('update');
    var dom2 = document.getElementById('delete');

    console.log('- This is the found dom object: ', dom);

    dom.addEventListener('click', function() {
        console.log(' - Button was click..');

        $.ajax({
            url: '/quotes',
            method: 'PUT',
            data: {
                name: 'Darth Vader',
                quote: 'I find your lack of faith disturbing...'
            },
            success: function(response){
                console.log('This is a test..');
                window.location.reload(true)
            }
        })
    })

    dom2.addEventListener('click', function() {
        console.log(' - Button was click..');

        $.ajax({
            url: '/quotes',
            method: 'DELETE',
            data: {
                name: 'Darth Vader',
                quote: 'I find your lack of faith disturbing...'
            },
            success: function(response){
                console.log('This is a test..');
                window.location.reload(true)
            }
        })
    })

});

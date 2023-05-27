const inputArray = $('.inpt')

$('.clearBtn').click(() => {
    inputArray.each(function() {
        this.value = ''
    })
})
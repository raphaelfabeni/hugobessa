App =
    init: ->
        App.$changePhrase = document.querySelector('.js-change-phrase')
        App.defaultPhrase = App.$changePhrase.innerHTML

        App.$changePhrase.addEventListener("mouseover", (event) ->
            App.startRandom()
        )

        App.$changePhrase.addEventListener("mouseout", (event) ->
            App.stopRandom()
        )

    startRandom: ->

        App.anmDuration = 300

        App.count = -1

        App.words = ["UM", "DESENVOLVEDOR", "FRONT-END", "TENTANDO", "MUDAR", "A", "FORMA", "COMO", "AS", "PESSOAS", "PENSAM", "AGEM", "VIVEM"]

        App.anm()

    stopRandom: ->
        window.clearTimeout(App.timeout)
        App.$changePhrase.innerHTML = App.defaultPhrase

    anm: ->
        App.count++
        App.count = 0 if App.count >= App.words.length
        App.timeout = setTimeout( ->
            App.$changePhrase.innerHTML = App.words[App.count]
            App.anm()
        , App.anmDuration)

document.addEventListener("DOMContentLoaded", (event) ->
    App.init()
)
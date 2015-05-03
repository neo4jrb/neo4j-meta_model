`import Ember from 'ember'`

FocusInputComponent = Ember.TextField.extend
  becomeFocused: (->
    @$().focus()
  ).on('didInsertElement')

`export default FocusInputComponent`

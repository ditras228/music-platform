@component('mail::message')
# Мы на финишной прямой!
# Осталось лишь подтвердить почту

@component('mail::button', ['url' => $url])
Подтвердить почту
@endcomponent

С уважением,<br>
{{ config('app.name') }}
@endcomponent

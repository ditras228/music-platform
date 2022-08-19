.PHONY: dev
dev:
	$(call _info, "\nСтарт laravel-сервера");
	php artisan serve

define _info
	$(call _echoColor, $1, 6)
endef

define _warning
	$(call _echoColor, $1, 1)
endef

define _echoColor
	@tput setaf $2
	@echo $1
	@tput sgr0
endef

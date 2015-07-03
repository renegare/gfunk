help:			## show this help.
	@echo "\n\
	\n\
	   ____   _____ _   _ _   _ _  __ \n\
	  / ___| |  ___| | | | \ | | |/ / \n\
	 | |  _  | |_  | | | |  \| | ' /  \n\
	 | |_| | |  _| | |_| | |\  | . \  \n\
	  \____| |_|    \___/|_| \_|_|\_\ \n\
	                                  \n\
	\n\
	Available MAKE tasks:\n"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'; \

setup:			## install all dependencies
	npm install

test:			## run mocha tests (G={filter-keyword})
	@./node_modules/.bin/mocha \
		tests \
		$(if $G, --grep $G --recursive,) \
		$(if $F, $F) \
		$(if $R, tests --recursive,) \

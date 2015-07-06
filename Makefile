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

test:			## run mocha tests (G={filter-phrase}, F={path/to/spec})
	./node_modules/.bin/mocha \
		tests/index.js \
		$(if $G, --grep $G tests --recursive, $(if $F,,tests --recursive)) \
		$(if $F, $F, $(if $G,,tests --recursive))

tdd:			## run tests on file change
	@nodemon ./node_modules/.bin/mocha -- tests/index.js tests --recursive

doc: export BRANCH=gh-pages
doc: export CURRENT_BRANCH=$(shell git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3)
doc:			## generate documentation and push to branch gh-pages
	-git branch -D $(BRANCH)
	git checkout -b $(BRANCH)
	./node_modules/.bin/jsdoc --readme README.md -d . .
	git add -A
	git push origin $(BRANCH) --force
	git checkout $(CURRENT_BRANCH)

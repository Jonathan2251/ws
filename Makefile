.PHONY: clean
clean:
	rm -f `find . -name \*~`
	rm -f `find . -name .DS_Store`
	rm -f `find . -name ._\*`

# Note: we have to run this as one big command in order to have the initial
# 'cd' take effect for the whole command.
# TODO: is there a nicer way of doing this?
.PHONY: gh-pages
gh-pages:
	make clean
	git checkout gh-pages
	git checkout master .
	git reset HEAD
	git add -A
	git commit -m "Generated gh-pages for `git log master -1 --pretty=short --abbrev-commit`" && git push origin gh-pages ; git checkout master


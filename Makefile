build: clean
	mkdir dist
	cp manifest.json dist/manifest.json
	cp ratio.js dist/ratio.js

clean:
	rm -rf dist
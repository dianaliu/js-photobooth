
SWFMILL     := swfmill
MTASC       := mtasc # not compatible

MTASCSTDLIB := /usr/share/mtasc/std

main:
	$(SWFMILL) simple src/jscam.xml jscam.swf
	$(MTASC) -v -swf jscam.swf -main jscam.as -version 8 -cp src -cp $(MTASCSTDLIB)

clean:
	rm -f jscam.swf



grails create-app webcellhts2v2-server

cd webcellhts2v2-server

grails run-app

#create a restful controller to upload and transform uploaded files:

grails create-controller DataFiles

open DataFilesController.groovy and put in:

```
package webcellhts2v2.server

import grails.rest.RestfulController

class DataFilesController extends RestfulController {

    static responseFormats = ['html', 'json']
    
    
}
```

test file upload
curl -F "metadata=<metadata.json" -F "file=@my-file.tar.gz" http://some.domain.com/add-file
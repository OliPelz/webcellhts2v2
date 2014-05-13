package webcellhts2v2.server

import grails.converters.JSON

class DataFilesServiceController {

    static responseFormats = ['json']
    
	def validateDataFiles() {
		def fileName = params.uploadedFile
		def responseData = [
		    'data_uploaded': file_body		    
		]
		render responseData as JSON
	}
    def readDataFiles() {
		def fileName = params.uploadedFile
		def responseData = [
		    'data_uploaded': file_body		    
		]
		render responseData as JSON	
	}
	def createPlateListFile() {
		def plateWellRepInfo = params.plateWellRepInfo
		//build file
		//return file
	}
	def createAndDownloadPlateListFile() {
		//render and return
	}
	
	        
	        
}

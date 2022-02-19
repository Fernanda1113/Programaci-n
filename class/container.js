const fs = require('fs')

class Contenedor {
    constructor(name) {
        this.fileName = name
        this.countID = 0
        this.content = []
        this.init()
    }

    async init() {
        try {
			let data = await fs.promises.readFile(this.fileName);
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('No hay archivo');
		}
    }
    //Written method: In this way the code is cleaner than other methods used
    async write() { 
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
    }

    save(object) {
        this.countID++ //Increase of the property that saves  the higher ID
        object["id"] = this.countID //Adding property Id to past object as parameter
        this.content.push(object) //Adding object to array
        this.write() //Adding object to file
        return `Objeto añadido con el id ${this.countID}.` //ID is return 
    }
    //Gives back an Array with present file objects
    getAll() { 
        return this.content
    }
    //Receives Id and gives back object with that Id or null if the object don’t exist
    getById(id) { 
        let result
        if (this.content !== []) {
            result = this.content.find(x => x.id === id)
            if (result === undefined) {
                result = null
            }
        } else {
            result = 'Archivo vacío'
        }
        return result
    }
    //Eliminate from file the object with the search ID
    deleteById(id) { 
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() 
            result = `Producto eliminado`
        } else {
            result = `Archivo vacío`
        }
        return result
    }
    //Eliminates all the present objects in the file
    async deleteAll() { 
        this.content = await this.content.splice(0, this.content.length)
        this.write()
    }

    update(id, obj){
        const index = this.content.findIndex( objT => objT.id == id);
        obj.id = this[index].id
        this.content[index] = obj;
        return obj;
    }
}

module.exports = Contenedor
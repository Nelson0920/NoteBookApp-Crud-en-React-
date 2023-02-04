import React from 'react'
import { Button, Container, Modal, ModalHeader, FormGroup, ModalFooter, ModalBody } from 'reactstrap'
import "../styles/Note.scss"
import 'bootstrap/dist/css/bootstrap.min.css'

/*elements */
const data = [{
    id: 1,
    tema: 'Examen de Mate',
    descripcion: "Estudiar para el examen de matematica del martes"
}
]

class Note extends React.Component {
    /*Estado*/
    state = {
        data: data,
        form: {
            id: '',
            tema: '',
            descripcion: ''
        },
        modalInsert: false,
        modalEdit: false,
    }

    handleChange = e =>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    /*Funciones para abrir los modales*/
    modalOpen = () =>{
        this.setState({modalInsert: true})
    }
    modalOpen2 = (element) =>{
        this.setState({modalEdit: true, form: element})
    }

    /*Funciones para cerrar los modales*/
    modalClose = () =>{
        this.setState({modalInsert: false})
    }
    modalClose2 = () =>{
        this.setState({modalEdit: false})
    }

    /*Funciones insertar los elements en un modal*/
    insert = () =>{
        var valueNew = {...this.state.form}
        valueNew.id= this.state.data.length+1
        var list = this.state.data
        list.push(valueNew)
        this.setState({data: list, modalInsert: false})
    }

    /*Funcion para editar*/
    edit = (data) =>{
        var counter = 0
        var list = this.state.data
        list.map((element)=>{
            if(data.id == element.id){
                list[counter].tema = data.tema
                list[counter].descripcion = data.descripcion
            }
            counter++
        })
        this.setState({data: list, modalEdit: false})
    }

    /*Funcion para eliminar*/
    delete = (data) =>{
        var option = confirm("Esta seguro que quiere eliminar la nota #"+ data.id)
        if(option){
            var counter = 0
            var list = this.state.data
            list.map((element) =>{
                if(element.id == data.id){
                    list.splice(counter, 1)
                }
                counter++
            })
        this.setState({data: list})
        }
    }

    render() {
        return (
            <>
            {/*Contanedor principal*/}
                <Container>
                    <br />
                    <Button className='button' color='success' onClick={()=>this.modalOpen()} title="Crear nueva nota">
                        <ion-icon name="add-circle"></ion-icon>
                    </Button>
                    <br /><br />
                    {this.state.data.map((element) => (
                        <div className='Note'>
                            <h3 className='idNote'>#{element.id}</h3>
                            <h3 className='titleNote'>Tema: {element.tema}</h3>
                            <div className='descriptionNote'>
                                <h4>Descripcion de la nota: </h4>
                                <p >{element.descripcion}</p>
                                <div className='buttons'>
                                    <Button color='primary' onClick={()=>this.modalOpen2(element)} title="Editar nota">
                                        <ion-icon name="create-outline" className="icons"></ion-icon>
                                    </Button>{' '}
                                    <Button color='danger' onClick={()=>this.delete(element)} title="Eliminar nota">
                                        <ion-icon name="trash-outline" className="icons"></ion-icon>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Container>
                
                {/*Modal para crear nuevas notas */}
                <Modal isOpen={this.state.modalInsert}>
                    <ModalHeader>
                        <div>
                            <h3>Insertar Nueva Nota</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Nota numero: <b>#{this.state.data.length + 1}</b></label>
                        </FormGroup>
                        <FormGroup>
                            <label>Tema:</label>
                            <input type="text" className="form-control" name='tema' onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label for="exampleFormControlTextarea1" class="form-label">Descripcion:</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='descripcion' onChange={this.handleChange}></textarea>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.insert()} title="Enviar">
                            <ion-icon name="paper-plane"></ion-icon>
                        </Button>
                        <Button color='danger' onClick={()=>this.modalClose()} title="Cancelar">
                            <ion-icon name="close-outline"></ion-icon>
                        </Button>
                    </ModalFooter>
                </Modal>

                {/*Modal para editar las notas */}
                <Modal isOpen={this.state.modalEdit}>
                    <ModalHeader>
                        <div>
                            <h3>Editar Nota</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Nota numero: <b>#{this.state.form.id}</b></label>
                        </FormGroup>
                        <FormGroup>
                            <label>Tema:</label>
                            <input type="text" className="form-control" name='tema' onChange={this.handleChange} value={this.state.form.tema}/>
                        </FormGroup>
                        <FormGroup>
                            <label for="exampleFormControlTextarea1" class="form-label">Descripcion:</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='descripcion' onChange={this.handleChange} value={this.state.form.descripcion}></textarea>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.edit(this.state.form)} title="Enviar">
                            <ion-icon name="create-outline"></ion-icon>
                        </Button>
                        <Button color='danger' onClick={()=>this.modalClose2()} title="Cancelar">
                            <ion-icon name="close-outline"></ion-icon>
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}
export default Note
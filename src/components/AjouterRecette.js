import React, { Component } from 'react'

class AjouterRecette extends Component {
  state = {
    nom: '',
    image: '',
    ingredients: '',
    instructions: '',
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const recette = { ...this.state }
    this.props.ajouterRecette(recette)

    //reset
    Object.keys(recette).forEach(item => {
      recette[item] = ''
    })
    this.setState({ ...recette })
  }
  render() {
    return (
      <div className='card'>
        <form
          className='admin-form ajouter-recette'
          onSubmit={this.handleSubmit}
        >
          <input
            type='text'
            value={this.state.nom}
            onChange={this.handleChange}
            name='nom'
            placeholder='nom de la recette...'
          />
          <input
            type='text'
            name='image'
            value={this.state.image}
            onChange={this.handleChange}
            placeholder="nom de l\'image..."
          />
          <textarea
            name='ingredients'
            rows='10'
            value={this.state.ingredients}
            onChange={this.handleChange}
            placeholder='liste des ingredients...'
          />
          <textarea
            name='instructions'
            rows='15'
            value={this.state.instructions}
            onChange={this.handleChange}
            placeholder='instructions de l recette...'
          />
          <button type='submit'>+ Ajouter un recette</button>
        </form>
      </div>
    )
  }
}

export default AjouterRecette

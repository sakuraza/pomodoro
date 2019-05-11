import React, { Component } from 'react';

import { toast } from 'react-toastify';

import ButtonGroup from './ButtonGroup';
import Display from './Display';
import Message from './Message';

class Timer extends Component {
    state = { 
        initialValue : 10,
        duration : 10,
        message : '',
        handle : 0
    };

    notify = (text, type) => {
        toast[type](text, { autoClose: 1500});
    }

    prependZero = value => {
        return value < 10 ? "0" + value.toString() : value.toString();
    }

    formatDuration = () => {
        const minutes = Math.floor(this.state.duration / 60);
        const secondes = Math.floor(this.state.duration % 60);

        return `${this.prependZero(minutes)}:${this.prependZero(secondes)}`;
    }

    //componentDidMount() est appelée immédiatement après que le composant est monté (inséré dans l’arbre).
    componentDidMount(){
        this.setState({
            initialValue: parseInt(this.props.duration, 10) * 60,
            duration: parseInt(this.props.duration, 10) * 60
        })
   
    }

    //componentWillUnmount() est appelée immédiatement avant qu’un composant soit démonté ou détruit
    componentWillUnmount(){
        this.clean();
    }
    
    count = () => {
        //Décrementation
        this.setState({
            duration: this.state.duration - 1
        });
        if(this.state.duration === 0){
            this.clean('Terminé');
        }
    };
    
    clean = (message) => {
        //Clear l'interval
        clearInterval(this.state.handle);
        
        //Affichage du message
        this.setState({
            message: message
        });       
    }

    start = () => {
        this.notify('Démarrage', 'success');
        //Création de l'interval
        const handle = setInterval(() => {
            this.count()
        }, 1000);
        //sauvegarde dans handle
        this.setState({
            handle : handle,
            message : ''
        });
    }
    stop = () => {
        this.notify('en pause', 'warn');
        this.clean('Mis en pause');
    }
    reset = () => {
        this.clean('Réinitialisé');
        this.setState({
            duration : this.state.initialValue
        });
        this.notify('Réinitialisation', 'error');
    }
    render() { 
        return (
            <div>
                < Display title={this.props.title} timerValue={this.formatDuration()} />
                < Message text={this.state.message} />                
                < ButtonGroup onStart={this.start} onStop={this.stop} onReset={this.reset} />
            </div>
          );
    }
}
 
export default Timer;
import React from 'react'

import './style.css'

export default function Navbar() {

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark navbar-style scrolling-navbar">
        
            <a className="navbar-brand" href="#">RentGo</a>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="basicExampleNav"> 
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Para passageiros</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Para motoristas</a>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cadastre-se</a>
                        <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">Seja um passageiro</a>
                            <a className="dropdown-item" href="#">Seja um motorista</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Entrar</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
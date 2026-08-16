import React from 'react';

export default function Header() {
    return (
        <header className="app-header">
            <div className="eyemark">
                <img src="/logo.png" alt="Tech IS" className="brand-logo" />
                <div className="brand-text">
                    <span className="num">PHOTO BOOTH</span>
                    <span className="name">Tech IS</span>
                </div>
            </div>
            <div className="tag">
                TECH IS SOUVENIR STATION<br />PHOTO BOOTH EDITION
            </div>
        </header>
    );
}

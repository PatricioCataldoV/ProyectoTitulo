import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = ({ tags }) => {
    
    if (!tags) {
        return <p>Cargando Etiquetas...</p>;
    }

    return (
    <div className="bg-gray-700 p-4 h-full">
        <h2 className="text-lg text-purple-600 font-semibold mb-2">Etiquetas</h2>
        
        <ul className="space-y-2">
        {tags.map((tag) => (
            <li key={tag.id}>
            <Link to={`/posts/by_tag/${tag.id}`} className="text-purple-500 hover:underline">
                {tag.name}
            </Link>
            </li>
        ))}
        </ul>
    </div>
    );
};

const mapStateToProps = (state) => ({
    tags: state.tags.tags,
});

export default connect(mapStateToProps)(Sidebar);
import React from 'react'
import { useGlobalContext } from './Context'

const Stories = () => {
    const { hits, isLoading, removePost } = useGlobalContext();
 
    if(isLoading){
        return(
            <>
                <h1>Loading.......</h1>
            </>
        );
    }

    
    return (
        <>
            <div className="stories-div">
                {hits.map((curPost) => {
                    const { title, author, objectID, url, num_comments } = curPost;
                    return ( 
                            <div className="card" key={objectID}>
                                <h2>{ title }</h2>
                                <p>
                                    By <span> { author } </span> | <span> { num_comments }</span> comments
                                </p>
                                <div className="card-button">
                                    <a href={ url } target="_blank">
                                        Read More
                                    </a>
                                    <a href="#" onClick={() => removePost(objectID) }>
                                        Remove
                                    </a>
                                </div>
                            </div>
                    );
                })}
            </div>
        </>
    );
};

export default Stories;






// import React from 'react'
// import { useGlobalContext } from './Context'

// const Stories = () => {
//     const { entries, isLoading, removePost } = useGlobalContext();
 
//     if(isLoading){
//         return(
//             <>
//                 <h1>Loading.......</h1>
//             </>
//         );
//     }

    
//     return (
//         <>
//             <div className="stories-div">
//                 {entries.map((curPost) => {
//                     const { Description, Category, Link, Auth, API } = curPost;
//                     return ( 
//                             <div className="card" key={API}>
//                                 <h2>{ Description }</h2>
//                                 <p>
//                                     Category: <span> { Category } </span> | By <span> { Auth }</span>
//                                 </p>
//                                 <div className="card-button">
//                                     <a href={ Link } target="_blank">
//                                         Read More
//                                     </a>
//                                     <a href="#" onClick={() => removePost(API) }>
//                                         Remove
//                                     </a>
//                                 </div>
//                             </div>
//                     );
//                 })}
//             </div>
//         </>
//     );
// };

// export default Stories;


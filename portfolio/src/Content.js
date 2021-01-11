/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T14:21:31-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-10T20:33:04-04:00
 */
 import React from 'react';
 // const YouTubeData = lazy(() => import('./modules/data/YouTubeData.js'));
 import YouTubeData from './modules/data/YouTubeData.js';

 class Content extends React.Component {
   render() {
     return (
       <div class="">

         <div class="row w-100 mx-auto g-3">

           <YouTubeData />

           <div class="col-md">
             <div class="border rounded p-3 shadow">
               <h5 class="card-title">GitHub</h5>
               <p class="card-text">content...</p>
             </div>
           </div>

           <div class="col-md">
             <div class="border rounded p-3 shadow">
               <h5 class="card-title">GitLab</h5>
               <p class="card-text">content...</p>
             </div>
           </div>

         </div>

      </div>
     );
   }
 }

 export default Content;

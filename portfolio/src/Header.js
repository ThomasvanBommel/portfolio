/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T13:38:19-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-10T20:32:43-04:00
 */
 import React from 'react';

 class Header extends React.Component {
   render() {
     return (
       <nav class="navbar navbar-expand navbar-dark bg-dark shadow">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Thomas vanBommel</a>

          <div class="d-flex">
            <span class="navbar-text">
              <button class="btn btn-outline-warning" type="button" style={{ "margin-right": "1em" }}>
                Donate
              </button>
              <button class="btn btn-outline-light" type="button">
                Contact
              </button>
            </span>
          </div>
        </div>
       </nav>
     );
   }
 }

 export default Header;

import { Button } from 'bootstrap';
import React from 'react';
import '../App.css';


class Scroll extends React.Component
{   
    render()
    {
        return(
            <div class="col-md-5 offset-md-5 ">
                <div class="Scroll">
                    <div class="row">
                        <div class="col-md-1" >
                            <input  type="button" value='1'/>
                        </div>
                        <div class="col-md-1">
                            <input type="button" value='2'/>
                        </div>
                        <div class="col-md-1">
                            <input type="button" value='3'/>
                        </div>
                        <div class="col-md-1">
                            <input type="button" value='4'/>
                        </div>
                        <div class="col-md-1">
                            <input type="button" value='5'/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Scroll
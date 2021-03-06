import React from 'react';
import './Header.scss';
import ContractUtils from '../ContractUtils'
import {getUserTypeName} from '../utils'

export default ({userPK, userType, networkId}) => {
    return (
        <div className="header">
            {userType === "anonymous" &&
            <div className="introduction">
                <div className="row center-md greeting">
                  <h2>Welcome to Reactima ESOP manager</h2>
                </div>
            </div>
            }

            <div className="row">
                <div className="col-xs-12 col-md-10 col-md-offset-1">
                    {userPK !== undefined &&
                    <div>
                        <p>Hello, you provided us with address: <b>{userPK}</b></p>
                        {userType === "anonymous" ?
                            <p>If you are Reactima employee, please pass address above to us to be included in ESOP.</p>
                            :
                            <p>Your position: <b>{getUserTypeName(userType)}</b></p>
                        }
                    </div>
                    }
                </div>
            </ div>
        </ div>
    )
}
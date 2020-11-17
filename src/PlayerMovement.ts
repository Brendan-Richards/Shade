import Phaser from 'phaser';
import MountainScene from './MountainScene';

type velocity = {
    x: number,
    y: number
}

export default (scene: MountainScene) => {
    //console.log(scene.playerWallJumping);
    const prevVelocity = scene.player.body.velocity;

    if(scene.changedWeapon){
        changedWeaponHandler(scene, prevVelocity);
        scene.changedWeapon = false;
    }
    else if(scene.playerCanJump){
        //console.log(scene.timer.getTime());
        const timeDiff = scene.time.now - scene.playerLastOnGroundTime;
        //console.log('time since last on ground', timeDiff);
        if(timeDiff > 100){
            scene.playerCanJump = false;
            scene.playerRampSliding = false;
        }
        else{
            groundCharacter(scene, prevVelocity);
        }
    }
    else{
        airborneCharacter(scene, prevVelocity);
    }

    //limit player's max speed to avoid going through collision boxes
    if(scene.playerMaxSpeed < Math.abs(scene.player.body.velocity.x)){
        const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
        scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody,
            factor*scene.playerMaxSpeed, 
            scene.player.body.velocity.y);
    }
    if(scene.playerMaxSpeed < Math.abs(scene.player.body.velocity.y)){
        scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody,
            scene.player.body.velocity.x,
            scene.player.body.velocity.y > 0 ? scene.playerMaxSpeed : -1 * scene.playerMaxSpeed);
    }
}

const changedWeaponHandler = (scene: MountainScene, prevVelocity: velocity) => {
    let newAnimation = '';

    switch(scene.equippedWeapon){
        case 'none': {
            switch(scene.prevEquippedWeapon){
                case 'sword': {
                    scene.audio.sheathSound.play(scene.audio.sheathSoundConfig);
                    switch(scene.currentPlayerAnimation){
                        case 'idleSword':
                        case 'idleSwordDrawn': {
                            newAnimation = 'idle';
                            break;
                        }
                        case 'runSword':
                        case 'runSwordDrawn': {
                            newAnimation = 'run';
                            break;
                        }
                        case 'jumpSword':
                        case 'jumpSwordDrawn': {
                            newAnimation = 'jump';
                            break;
                        }
                        case 'wallSlideSword':
                        case 'wallSlideSwordDrawn': {
                            newAnimation = 'wallSlide';
                            break;
                        }
                        case 'ledgeGrabSword':
                        case 'ledgeGrabSwordDrawn': {
                            newAnimation = 'ledgeGrab';
                            break;
                        }
                        case 'fallSword':
                        case 'fallSwordDrawn': {
                            newAnimation = 'fall';
                            break;
                        }
                    }
                    break;
                }
                case 'bow': {
                    switch(scene.currentPlayerAnimation){
                        case 'idleBowDrawn': {
                            newAnimation = 'idle';
                            break;
                        }
                        case 'runBowDrawn': {
                            newAnimation = 'run';
                            break;
                        }
                        case 'jumpBowDrawn': {
                            newAnimation = 'jump';
                            break;
                        }
                        case 'wallSlideBowDrawn': {
                            newAnimation = 'wallSlide';
                            break;
                        }
                        case 'ledgeGrabBowDrawn': {
                            newAnimation = 'ledgeGrab';
                            break;
                        }
                        case 'fallBowDrawn': {
                            newAnimation = 'fall';
                            break;
                        }
                    }
                }
            }
            break;
        }
        case 'sword': {
            scene.audio.drawSound.play(scene.audio.drawSoundConfig);
            switch(scene.prevEquippedWeapon){
                case 'none': {
                    switch(scene.currentPlayerAnimation){
                        case 'idle': {
                            newAnimation = 'idleSwordDrawn';
                            break;
                        }
                        case 'run': {
                            newAnimation = 'runSwordDrawn';
                            break;
                        }
                        case 'jump': {
                            newAnimation = 'jumpSwordDrawn';
                            break;
                        }
                        case 'wallSlide': {
                            newAnimation = 'wallSlideSwordDrawn';
                            break;
                        }
                        case 'ledgeGrab': {
                            newAnimation = 'ledgeGrabSwordDrawn';
                            break;
                        }
                        case 'fall': {
                            newAnimation = 'fallSwordDrawn';
                            break;
                        }
                    }
                    break;
                }
                case 'bow': {
                    switch(scene.currentPlayerAnimation){
                        case 'idleBowDrawn': {
                            newAnimation = 'idleSwordDrawn';
                            break;
                        }
                        case 'runBowDrawn': {
                            newAnimation = 'runSwordDrawn';
                            break;
                        }
                        case 'jumpBowDrawn': {
                            newAnimation = 'jumpSwordDrawn';
                            break;
                        }
                        case 'wallSlideBowDrawn': {
                            newAnimation = 'wallSlideSwordDrawn';
                            break;
                        }
                        case 'ledgeGrabBowDrawn': {
                            newAnimation = 'ledgeGrabSwordDrawn';
                            break;
                        }
                        case 'fallBowDrawn': {
                            newAnimation = 'fallSwordDrawn';
                            break;
                        }
                    }
                }
            }
            break;
        }
        case 'bow': {
            switch(scene.prevEquippedWeapon){
                case 'sword': {
                    scene.audio.sheathSound.play(scene.audio.sheathSoundConfig);
                    switch(scene.currentPlayerAnimation){
                        case 'idleSword':
                        case 'idleSwordDrawn': {
                            newAnimation = 'idleBowDrawn';
                            break;
                        }
                        case 'runSword':
                        case 'runSwordDrawn': {
                            newAnimation = 'runBowDrawn';
                            break;
                        }
                        case 'jumpSword':
                        case 'jumpSwordDrawn': {
                            newAnimation = 'jumpBowDrawn';
                            break;
                        }
                        case 'wallSlideSword':
                        case 'wallSlideSwordDrawn': {
                            newAnimation = 'wallSlideBowDrawn';
                            break;
                        }
                        case 'ledgeGrabSword':
                        case 'ledgeGrabSwordDrawn': {
                            newAnimation = 'ledgeGrabBowDrawn';
                            break;
                        }
                        case 'fallSword':
                        case 'fallSwordDrawn': {
                            newAnimation = 'fallBowDrawn';
                            break;
                        }
                    }                    
                    break;
                }
                case 'none': {
                    switch(scene.currentPlayerAnimation){
                        case 'idle': {
                            newAnimation = 'idleBowDrawn';
                            break;
                        }
                        case 'run': {
                            newAnimation = 'runBowDrawn';
                            break;
                        }
                        case 'jump': {
                            newAnimation = 'jumpBowDrawn';
                            break;
                        }
                        case 'wallSlide': {
                            newAnimation = 'wallSlideBowDrawn';
                            break;
                        }
                        case 'ledgeGrab': {
                            newAnimation = 'ledgeGrabBowDrawn';
                            break;
                        }
                        case 'fall': {
                            newAnimation = 'fallBowDrawn';
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }

    if(['ledgeGrab', 'ledgeGrabSword', 'ledgeGrabSwordDrawn', 'ledgeGrabBowDrawn'].includes(newAnimation)){
        setNewCharacterAnimation(scene, newAnimation, scene.currentPlayerDirection==='left', false);
        scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, 0, 0);
        scene.player.setIgnoreGravity(true);
    }
    else{
        setNewCharacterAnimation(scene, newAnimation, scene.currentPlayerDirection==='left', false);
        const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
        scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, factor * Math.abs(prevVelocity.x), prevVelocity.y);
    }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const groundCharacter = (scene: MountainScene, prevVelocity: velocity) => {
    // set the animation
    if(scene.drawSword || scene.sheathSword){
        console.log('entering groundDrawSheath()');
        groundDrawSheath(scene);
    }
    else if(scene.playerAttacking){
        groundPlayerAttacking(scene);
    }
    else if (scene.controlConfig.jumpControl.isDown && scene.controlConfig.jumpControl.timeDown > scene.prevJumpTime){
        groundPlayerJump(scene);
    }  
    else if(scene.playerRampSliding){
        if(scene.currentPlayerAnimation!=='groundSlide'){
            scene.playerFriction = 0;
            setNewCharacterAnimation(scene, 'groundSlide', scene.playerGroundSlideDirection==='left', false); 
            scene.player.setAngle(scene.playerGroundSlideDirection==='left' ? -45 : 45);
        }  
    }
    else if(scene.playerFlatSliding){
        
        if(scene.controlConfig.leftControl.isUp && scene.controlConfig.rightControl.isUp){
            scene.playerFriction = 0;
            setNewCharacterAnimation(scene, 'groundSlide', scene.currentPlayerDirection==='left', false); 
        }
        else{
            scene.playerFlatSliding = false;
        }

    }    
    else if (scene.controlConfig.leftControl.isDown){
        if(!((scene.currentPlayerAnimation==='run' || scene.currentPlayerAnimation==='runSword' || scene.currentPlayerAnimation==='runSwordDrawn' || scene.currentPlayerAnimation==='runBowDrawn' || scene.currentPlayerAnimation==='runGlove')  && scene.currentPlayerDirection==='left')){
            let animation = '';
            switch(scene.equippedWeapon){
                case 'glove': {animation = 'runGlove'; break;}
                case 'bow': {animation = 'runBowDrawn'; break;}
                case 'none': {animation = 'run'; break;}
                case 'sword': {animation = 'runSwordDrawn'; break;}
            }
            setNewCharacterAnimation(scene, animation, true, false);
        }
    }
    else if (scene.controlConfig.rightControl.isDown){
        if(!((scene.currentPlayerAnimation==='run' || scene.currentPlayerAnimation==='runSword' || scene.currentPlayerAnimation==='runSwordDrawn' || scene.currentPlayerAnimation==='runBowDrawn' || scene.currentPlayerAnimation==='runGlove')  && scene.currentPlayerDirection==='right')){
            let animation = '';
            switch(scene.equippedWeapon){
                case 'glove': {animation = 'runGlove'; break;}
                case 'bow': {animation = 'runBowDrawn'; break;}
                case 'none': {animation = 'run'; break;}
                case 'sword': {animation = 'runSwordDrawn'; break;}
            }
            setNewCharacterAnimation(scene, animation, false, false);        
        }
    }
    else{
        if(scene.currentPlayerAnimation!=='idle' && scene.currentPlayerAnimation!=='idleSword' && scene.currentPlayerAnimation!=='idleSwordDrawn' && scene.currentPlayerAnimation!=='idleBowDrawn' && scene.currentPlayerAnimation!=='idleGlove'){
            let animation = '';
            switch(scene.equippedWeapon){
                case 'glove': {animation = 'idleGlove'; break;}
                case 'bow': {animation = 'idleBowDrawn'; break;}
                case 'none': {animation = 'idle'; break;}
                case 'sword': {animation = 'idleSwordDrawn'; break;}
            }
            setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
        }
    }
    setGroundVelocity(scene, prevVelocity);
}

////////////////////////////////////////////////////////////////////////////////////////////
const groundDrawSheath = (scene: MountainScene) => {
    if(scene.drawSword && !scene.swordDraws.includes(scene.currentPlayerAnimation)){
        let animation = '';
        switch(scene.currentPlayerAnimation){
            case 'idleSword': {animation = 'idleSwordDraw'; break;}
            case 'runSword': {animation = 'runSwordDraw'; break;}
        }
        setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
    }
    else if(scene.sheathSword && !scene.swordSheaths.includes(scene.currentPlayerAnimation)){
        let animation = '';
        switch(scene.currentPlayerAnimation){
            case 'idleSwordDrawn': {animation = 'idleSwordSheath'; break;}
            case 'runSwordDrawn': {animation = 'runSwordSheath'; break;}
        } 
        setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
    }
    else if(scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection==='right'){
        //const currentFrameIdx = scene.player.anims.currentFrame.index;
        setNewCharacterAnimation(scene, scene.currentPlayerAnimation, true, false);
    }
    else if(scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection==='left'){
        //const currentFrameIdx = scene.player.anims.currentFrame.index;
        setNewCharacterAnimation(scene, scene.currentPlayerAnimation, false, false);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
const groundPlayerAttacking = (scene: MountainScene) => {
    console.log('in ground player attacking');
    if(scene.equippedWeapon==='sword'){
        if(!scene.swordAttacks.includes(scene.currentPlayerAnimation) && scene.time.now - scene.lastAttackTime > 500){
            let swing = '';
            if(!scene.heavyAttack){
                switch(scene.prevSwordSwing){
                    case 'idleSwing1': {swing = 'idleSwing2'; scene.prevSwordSwing = 'idleSwing2'; break;}
                    case 'idleSwing2': {swing = 'idleSwing1'; scene.prevSwordSwing = 'idleSwing1'; break;}
                    default: {swing = 'idleSwing1'; scene.prevSwordSwing = 'idleSwing1'; break;}
                }
            }
            else{
                scene.prevSwordSwing = 'runSwing';
                swing = 'runSwing';
                scene.heavyAttack = false;
            }

            setNewCharacterAnimation(scene, swing, scene.currentPlayerDirection==='left', false);

           // scene.stamina -= scene.attackStaminaPenalty;
        }
    }
    else if(scene.equippedWeapon==='none'){
        if(scene.playerKick && scene.currentPlayerAnimation!=='groundKick'){
            setNewCharacterAnimation(scene, 'groundKick', scene.currentPlayerDirection==='left', false);
        }
        else if(!scene.meeleeAttacks.includes(scene.currentPlayerAnimation) && scene.time.now - scene.lastAttackTime > 500){
            let attack = '';
            switch(scene.prevMeeleeAttack){
                case 'punch1': {attack = 'punch2'; scene.prevMeeleeAttack = 'punch2'; break;}
                case 'punch2': {attack = 'punch3'; scene.prevMeeleeAttack = 'punch3'; break;}
                case 'punch3': {attack = 'runPunch'; scene.prevMeeleeAttack = 'runPunch'; break;}
                //case 'runPunch': {attack = 'groundKick'; scene.prevMeeleeAttack = 'groundKick'; break;}
                default: {attack = 'punch1'; scene.prevMeeleeAttack = 'punch1'; break;}
            }
            setNewCharacterAnimation(scene, attack, scene.currentPlayerDirection==='left', false);

           // scene.stamina -= scene.attackStaminaPenalty;
        }            
    }
    else if(scene.equippedWeapon==='bow'){
        if(scene.currentPlayerAnimation==='idleHoldLoop' || scene.currentPlayerAnimation==='runHoldLoop'){
            if (scene.controlConfig.jumpControl.isDown && scene.controlConfig.jumpControl.timeDown > scene.prevJumpTime){
                setNewCharacterAnimation(scene, 'jumpHoldLoop', scene.currentPlayerDirection==='left', false);
                scene.playerCanJump = false;
                scene.playerFlatSliding = false;
                scene.playerRampSliding = false;
                scene.prevJumpTime = scene.controlConfig.jumpControl.timeDown;
            }
            else if(scene.bowRelease){
                let animation = '';
                switch(scene.currentPlayerAnimation){
                    case 'idleHoldLoop': { animation = 'idleRelease'; break; }
                    case 'runHoldLoop': { animation = 'runRelease'; break; }
                }
                setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
            }
            else if(scene.currentPlayerAnimation==='idleHoldLoop'){
                if(scene.controlConfig.leftControl.isDown){
                    setNewCharacterAnimation(scene, 'runHoldLoop', true, false);
                }
                else if(scene.controlConfig.rightControl.isDown){
                    setNewCharacterAnimation(scene, 'runHoldLoop', false, false);
                }
            }
            else{// scene.currentPlayerAnimation==='runHoldLoop'
                if(scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection==='right'){
                    setNewCharacterAnimation(scene, scene.currentPlayerAnimation, true, false);
                }
                else if(scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection==='left'){
                    setNewCharacterAnimation(scene, scene.currentPlayerAnimation, false, false);
                }
                else if(scene.controlConfig.rightControl.isUp && scene.controlConfig.leftControl.isUp){
                    setNewCharacterAnimation(scene, 'idleHoldLoop', scene.currentPlayerDirection==='left', false);
                }
            }
        }
        else if(scene.currentPlayerAnimation==='idleNotch' || scene.currentPlayerAnimation==='runNotch'){
            if(scene.controlConfig.jumpControl.isDown && scene.controlConfig.jumpControl.timeDown > scene.prevJumpTime){
                const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
                const jumpX = scene.currentPlayerAnimation==='idleNotch' ? 0 : factor*scene.playerSpeed;
                const jumpY = -1*scene.playerJumpHeight;
                
                setNewCharacterAnimation(scene, 'jumpNotch', scene.currentPlayerDirection==='left', false);
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, jumpX, jumpY);  
            }
            else if(scene.controlConfig.leftControl.isDown && (scene.currentPlayerDirection==='right' || scene.currentPlayerAnimation==='idleNotch')){
                setNewCharacterAnimation(scene, 'runNotch', true, false);
            }
            else if(scene.controlConfig.rightControl.isDown && (scene.currentPlayerDirection==='left' || scene.currentPlayerAnimation==='idleNotch')){
                setNewCharacterAnimation(scene, 'runNotch', false, false);
            }
            else if(scene.controlConfig.rightControl.isUp && scene.controlConfig.leftControl.isUp && scene.currentPlayerAnimation!=='idleNotch'){
                setNewCharacterAnimation(scene, 'idleNotch', scene.currentPlayerDirection==='left', false);
            }        
        }
        else if(scene.currentPlayerAnimation==='idleRelease' || scene.currentPlayerAnimation==='runRelease'){
            if(scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection==='right'){
                setNewCharacterAnimation(scene, scene.currentPlayerAnimation, true, false);
            }
            else if(scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection==='left'){
                setNewCharacterAnimation(scene, scene.currentPlayerAnimation, false, false);
            }
            else if(scene.controlConfig.rightControl.isUp && scene.controlConfig.leftControl.isUp && scene.currentPlayerAnimation!=='idleRelease'){
                setNewCharacterAnimation(scene, 'idleRelease', scene.currentPlayerDirection==='left', false);
            }               
        }
        else if(scene.currentPlayerAnimation==='fallHoldLoop'){ // hit the ground while notched in mid air
            setNewCharacterAnimation(scene, 'idleHoldLoop', scene.currentPlayerDirection==='left', false);
        }
        else if(!scene.bowAttacks.includes(scene.currentPlayerAnimation)){
            let animation = '';
            switch(scene.currentPlayerAnimation){
                case 'runBowDrawn': { animation = 'runNotch'; break; }
                case 'idleBowDrawn':
                default: { animation = 'idleNotch'; break; }
            }
            setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
        }
    }
    else if(scene.equippedWeapon==='glove'){
        if(scene.mana <= 0){
            scene.playerAttacking = false;
            scene.stopCasting = false;
            //scene.regenMana = true;
        }
        else if(!scene.magicAttacks.includes(scene.currentPlayerAnimation)){
            let animation = '';
            switch(scene.currentPlayerAnimation){
                case 'runGlove': { animation = 'runCast'; break; }
                case 'idleGlove':
                default: { animation = 'idleCast'; break; }
            }
            setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
        }
        else if(scene.currentPlayerAnimation==='wallSlideCast' || scene.currentPlayerAnimation==='wallSlideCastLoop'){
            setNewCharacterAnimation(scene, 'idleGlove', scene.currentPlayerDirection==='left', false);
            scene.playerAttacking = false;
        }
        else if(scene.currentPlayerAnimation==='idleCast' || scene.currentPlayerAnimation==='runCast'){
            if(scene.controlConfig.jumpControl.isDown && scene.controlConfig.jumpControl.timeDown > scene.prevJumpTime){
                const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
                const jumpX = scene.currentPlayerAnimation==='idleCast' ? 0 : factor*scene.playerSpeed;
                const jumpY = -1*scene.playerJumpHeight;
                
                const currentFrameIndex = scene.player.anims.currentFrame.index - 1;
                setNewCharacterAnimation(scene, 'jumpCast', scene.currentPlayerDirection==='left', false, currentFrameIndex);
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, jumpX, jumpY);  
            }
            else if(scene.controlConfig.leftControl.isDown && (scene.currentPlayerDirection==='right' || scene.currentPlayerAnimation==='idleCast')){
                const currentFrameIndex = scene.player.anims.currentFrame.index - 1;
                setNewCharacterAnimation(scene, 'runCast', true, false, currentFrameIndex);                
            }
            else if(scene.controlConfig.rightControl.isDown && (scene.currentPlayerDirection==='left' || scene.currentPlayerAnimation==='idleCast')){
                const currentFrameIndex = scene.player.anims.currentFrame.index - 1;
                setNewCharacterAnimation(scene, 'runCast', false, false, currentFrameIndex);
            }
            else if(scene.controlConfig.rightControl.isUp && scene.controlConfig.leftControl.isUp && scene.currentPlayerAnimation==='runCast'){
                const currentFrameIndex = scene.player.anims.currentFrame.index - 1;
                setNewCharacterAnimation(scene, 'idleCast', scene.currentPlayerDirection==='left', false, currentFrameIndex);
            }

            if(scene.player.anims.currentFrame.isLast){
                scene.stopCasting = true;
            }
            else{
                scene.stopCasting = false;
            }           
        }
        else if(scene.currentPlayerAnimation==='idleCastLoop' || scene.currentPlayerAnimation==='runCastLoop'){
            if(!scene.holdingCast){
                scene.playerAttacking = false;
                scene.stopCasting = true;
            }
            else if(scene.controlConfig.jumpControl.isDown && scene.controlConfig.jumpControl.timeDown > scene.prevJumpTime){
                const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
                const jumpX = scene.currentPlayerAnimation==='idleCastLoop' ? 0 : factor*scene.playerSpeed;
                const jumpY = -1*scene.playerJumpHeight;
                
                const currentFrameIndex = scene.player.anims.currentFrame.index - 1;
                setNewCharacterAnimation(scene, 'jumpCastLoop', scene.currentPlayerDirection==='left', false, currentFrameIndex);
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, jumpX, jumpY);  
            }  
            else if(scene.controlConfig.leftControl.isDown && (scene.currentPlayerDirection==='right' || scene.currentPlayerAnimation==='idleCastLoop')){
                setNewCharacterAnimation(scene, 'runCastLoop', true, false);
            }
            else if(scene.controlConfig.rightControl.isDown && (scene.currentPlayerDirection==='left' || scene.currentPlayerAnimation==='idleCastLoop')){
                setNewCharacterAnimation(scene, 'runCastLoop', false, false);
            }
            else if(scene.controlConfig.rightControl.isUp && scene.controlConfig.leftControl.isUp && scene.currentPlayerAnimation==='runCastLoop'){
                setNewCharacterAnimation(scene, 'idleCastLoop', scene.currentPlayerDirection==='left', false);
            }
        }
        else if(scene.currentPlayerAnimation==='fallCastLoop'){ // hit the ground while cast looping in mid air
            setNewCharacterAnimation(scene, 'idleCastLoop', scene.currentPlayerDirection==='left', false);
        }
        else if(scene.currentPlayerAnimation==='fallCast'){ // hit the ground while casting in mid air
            setNewCharacterAnimation(scene, 'idleCast', scene.currentPlayerDirection==='left', false);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
const groundPlayerJump = (scene: MountainScene) => {
    let animationName = '';
    switch(scene.equippedWeapon){
        case 'glove': {animationName = 'jumpGlove'; break;}
        case 'bow': {animationName = 'jumpBowDrawn'; break;}
        case 'none': {animationName = 'jump'; break;}
        case 'sword': {animationName = 'jumpSwordDrawn'; break;}
    }
    setNewCharacterAnimation(scene, animationName, scene.currentPlayerDirection==='left', false);   
    scene.playerCanJump = false;
    scene.playerFlatSliding = false;
    scene.playerRampSliding = false;
    scene.prevJumpTime = scene.controlConfig.jumpControl.timeDown;
    //console.log('jump time:', this.prevJumpTime);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
const setGroundVelocity = (scene: MountainScene, prevVelocity: velocity) => {
    //set the characters speed depending on the active animation and active direction
    switch(scene.currentPlayerAnimation){
        case 'idleSwing1':
        case 'idleSwing2':
        case 'idleSword':
        case 'idleCast':
        case 'idleCastLoop':
        case 'runSwing':
        case 'idleSwordDrawn':
        case 'idleBowDrawn':
        case 'idleNotch':
        case 'idleGlove':
        case 'idle': {
            scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, 0, prevVelocity.y);
            break;
        }
        case 'runHoldLoop':
        case 'runNotch':
        case 'runSword':
        case 'runNotch':
        case 'runCast':
        case 'runCastLoop':
        case 'runRelease':
        case 'runSwordDrawn':
        case 'runSwordDraw':
        case 'runSwordSheath':
        case 'runBowDrawn':
        case 'runGlove':
        case 'run': {
            if(scene.currentPlayerDirection==='right'){
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, scene.playerSpeed, prevVelocity.y);
                break;
            }
            else if(scene.currentPlayerDirection==='left'){
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, -1*scene.playerSpeed, prevVelocity.y);
                break;
            }
            else{
                console.log("don't understand previous character direction");
                break;
            }
        }
        case 'jumpSword':
        case 'jumpSwordDrawn':
        case 'jumpBowDrawn':
        case 'jumpGlove':
        case 'jumpHoldLoop':
        case 'jump': {
            if(scene.prevPlayerAnimation==='idle' || scene.prevPlayerAnimation==='idleSword' || scene.prevPlayerAnimation==='idleSwordDrawn' || scene.prevPlayerAnimation==='idleBowDrawn' || scene.prevPlayerAnimation==='idleGlove' || scene.prevPlayerAnimation==='idleCastLoop'){
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, prevVelocity.x, -1*scene.playerJumpHeight);
            }
            else{
                const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, factor*scene.playerSpeed, -1*scene.playerJumpHeight);
            }
            break;
        } 
        case 'groundSlide': {
            const factor = scene.playerGroundSlideDirection==='left' ? -1 : 1;
            scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, factor * Math.abs(prevVelocity.x), prevVelocity.y)
            break;
        }
        default: break;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
const airborneCharacter = (scene: MountainScene, prevVelocity: velocity) => {
    if(scene.playerWallJumping){
        const tolerance = 60;
        const prevX = scene.wallJumpOffPosition.x;
        const currX = scene.player.x
        const distance = Math.abs(currX-prevX);

        if(distance > tolerance){
            scene.playerWallJumping = false; 
        }
    }
    else if(scene.drawSword || scene.sheathSword){
        console.log('entering airDrawSheath()');
        airDrawSheath(scene);
    }
    else if(scene.playerAttacking){
        airPlayerAttacking(scene, prevVelocity );
    }
    else if(scene.playerWallSliding){
        playerWallSliding(scene);
    }
    else if(scene.playerLedgeGrab || scene.playerLedgeClimb){
        playerLedgeGrabbing(scene, prevVelocity);
    }
    else{
        if(prevVelocity.y >= 0){ // player moving down
            const buffer = 20; // how far we can be from the wall and still do a wall jump
            const withinWallJumpRange = scene.player.x > scene.stopWallSlidingPosition.x - buffer && scene.player.x < scene.stopWallSlidingPosition.x + buffer;
            const validJump = scene.controlConfig.jumpControl.isDown && scene.controlConfig.jumpControl.timeDown > scene.prevJumpTime;
            const canWallSlideAgain = scene.player.x===scene.stopWallSlidingPosition.x && scene.stamina > 0;

            if(withinWallJumpRange && validJump && scene.stamina > 0){
                let animationName = '';
                
                switch(scene.equippedWeapon){
                    case 'glove': {animationName = 'jumpGlove'; break;}
                    case 'bow': {animationName = 'jumpBowDrawn'; break;}
                    case 'none': {animationName = 'jump'; break;}
                    case 'sword': {animationName = 'jumpSwordDrawn'; break;}
                }
                setNewCharacterAnimation(scene, animationName, scene.currentPlayerDirection==='left', false); 
                
                const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
                //scene.player.setPosition(scene.player.body.position.x + (-1*factor*100), scene.player.body.position.y);

                const jumpX = factor*scene.playerSpeed;
                const jumpY = scene.playerIceWallSliding ? scene.playerIceJumpHeight : scene.playerWallJumpHeight;
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, jumpX, jumpY); 

                scene.playerCanJump = false;        
                scene.playerWallSliding = false;   
                scene.playerWallJumping = true;  
                // scene.wallJumpOffPosition = {...scene.playerBody.position};
                scene.wallJumpOffPosition = {x: scene.player.x, y: scene.player.y};  
                scene.prevJumpTime = scene.controlConfig.jumpControl.timeDown;

                console.log('set player to wall jump from fall next to wall');
                               
            }
            else if(scene.currentPlayerAnimation!=='fall' && scene.currentPlayerAnimation!=='fallSword' && scene.currentPlayerAnimation!=='fallSwordDrawn' && scene.currentPlayerAnimation!=='fallBowDrawn' && scene.currentPlayerAnimation!=='fallGlove'){
                let animationName = '';
                // console.log('setting fall animation');
                // console.log(scene.equippedWeapon);
                switch(scene.equippedWeapon){
                    case 'glove': {animationName = 'fallGlove'; break;}
                    case 'bow': {animationName = 'fallBowDrawn'; break;}
                    case 'none': {animationName = 'fall'; break;}
                    case 'sword': {animationName = 'fallSwordDrawn'; break;}
                }
                scene.playerFriction = 0;
                setNewCharacterAnimation(scene, animationName, scene.currentPlayerDirection==='left', false);
            }
            else if (scene.controlConfig.leftControl.isDown && scene.controlConfig.rightControl.isUp)
            {
                //console.log('checking if player can start wall sliding again at position:', this.playerBody.position);
                //if(scene.playerBody.position.x===scene.stopWallSlidingPosition.x &&
                if(scene.player.x===scene.stopWallSlidingPosition.x && scene.stopWallSlidingDirection==='left'){
                        //console.log('resetting wall slide to left wall');
                        scene.playerWallSliding = true;
                }
                else if(scene.currentPlayerDirection!=='left'){
                    //if(scene.currentPlayerAnimation!=='fall' && scene.currentPlayerAnimation!=='fallSword' && scene.currentPlayerAnimation!=='fallSwordDrawn' && scene.currentPlayerAnimation!=='fallbowDrawn'){
                        let animationName = '';
                        // console.log('setting fall animation');
                        // console.log(scene.equippedWeapon);
                        switch(scene.equippedWeapon){
                            case 'glove': {animationName = 'fallGlove'; break;}
                            case 'bow': {animationName = 'fallBowDrawn'; break;}
                            case 'none': {animationName = 'fall'; break;}
                            case 'sword': {animationName = 'fallSwordDrawn'; break;}
                        }
                        scene.playerFriction = 0;
                        setNewCharacterAnimation(scene, animationName, true, false);
                   // }
                }
            }
            else if (scene.controlConfig.rightControl.isDown && scene.controlConfig.leftControl.isUp)
            {
                //console.log('checking if player can start wall sliding again at position:');
                if(scene.player.x===scene.stopWallSlidingPosition.x && scene.stopWallSlidingDirection==='right'){
                        //console.log('resetting wall slide to right wall');
                        scene.playerWallSliding = true;
                 }

                else if(scene.currentPlayerDirection!=='right'){
                        let animationName = '';
                        // console.log('setting fall animation');
                        // console.log(scene.equippedWeapon);
                        switch(scene.equippedWeapon){
                            case 'glove': {animationName = 'fallGlove'; break;}
                            case 'bow': {animationName = 'fallBowDrawn'; break;}
                            case 'none': {animationName = 'fall'; break;}
                            case 'sword': {animationName = 'fallSwordDrawn'; break;}
                        }
                        scene.playerFriction = 0;
                        setNewCharacterAnimation(scene, animationName, false, false);
                }
            }

        }
        else{// player is still moving up
            if (scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection!=='right'){
                scene.currentPlayerDirection = 'right';
                setNewCharacterAnimation(scene, scene.currentPlayerAnimation, false, false);        
            }       
            else if (scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection!=='left'){
                scene.currentPlayerDirection = 'left';
                setNewCharacterAnimation(scene, scene.currentPlayerAnimation, true, false);
            }    
        }
    }
    setAirVelocity(scene, prevVelocity);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const playerWallSliding = (scene: MountainScene) => {
        //start wallsliding
        if((scene.currentPlayerAnimation!=='wallSlide' && scene.currentPlayerAnimation!=='wallSlideSword' && scene.currentPlayerAnimation!=='wallSlideSwordDrawn' && scene.currentPlayerAnimation!=='wallSlideBowDrawn' && scene.currentPlayerAnimation!=='wallSlideGlove') || scene.resetWallSlide){
            //scene.playerFriction = 0.2;
            let animation = '';
            switch(scene.equippedWeapon){
                case 'glove': {animation = 'wallSlideGlove'; break;}
                case 'bow': {animation = 'wallSlideBowDrawn'; break;}
                case 'none': {animation = 'wallSlide'; break;}
                case 'sword': {animation = 'wallSlideSwordDrawn'; break;}
            }
            setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
        }
        //jump off the wall
        if(scene.controlConfig.jumpControl.isDown && scene.controlConfig.jumpControl.timeDown > scene.prevJumpTime && scene.stamina > 0){
            //console.log('jump off wall');
            //flip the players direction cause they were facing the opposite way when on the wall
            scene.currentPlayerDirection = scene.currentPlayerDirection==='left' ? 'right' : 'left';
            //const animationName = scene.swordDrawn ? 'jumpSword' : 'jump';
            let animation = '';
            switch(scene.equippedWeapon){
                case 'glove': {animation = 'jumpGlove'; break;}
                case 'bow': {animation = 'jumpBowDrawn'; break;}
                case 'none': {animation = 'jump'; break;}
                case 'sword': {animation = 'jumpSwordDrawn'; break;}
            }
            scene.stopWallSlidingPosition = {x: scene.player.x, y: scene.player.y};
            setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
            //console.log('player direction at tiem of wall jump:', scene.currentPlayerDirection);

            const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
            const jumpX = factor*scene.playerSpeed;
            const jumpY = scene.playerIceWallSliding ? scene.playerIceJumpHeight : scene.playerWallJumpHeight;
            scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, jumpX, jumpY);  
            console.log('player velocity:', jumpX, jumpY);
            
            scene.playerCanJump = false;        
            scene.playerWallSliding = false;
            scene.playerIceWallSliding = false;   
            scene.playerWallJumping = true;  
            // scene.wallJumpOffPosition = {...scene.playerBody.position};
            scene.wallJumpOffPosition = {x: scene.player.x, y: scene.player.y};  
            scene.prevJumpTime = scene.controlConfig.jumpControl.timeDown;
            //console.log('jujst set player wall jump position as:', this.wallJumpOffPosition);

            scene.inContactWithWall = false;
        }
        else{//check if we should stop wall sliding
            if(scene.controlConfig.rightControl.isDown  && scene.controlConfig.leftControl.isUp && scene.currentPlayerDirection!=='right' ||
                scene.controlConfig.leftControl.isDown  && scene.controlConfig.rightControl.isUp && scene.currentPlayerDirection!=='left'){
                   //console.log('stopping wall slide');
                   scene.playerFriction = 0;
                   //flip the players direction cause they were facing the opposite way when on the wall
                   scene.stopWallSlidingDirection = scene.currentPlayerDirection;
                   scene.currentPlayerDirection = scene.currentPlayerDirection==='left' ? 'right' : 'left';
                   console.log('checking if player can start wall sliding again at position:');
                   scene.stopWallSlidingPosition = {x: scene.player.x, y: scene.player.y}; 
                   //const animationName = scene.swordDrawn ? 'fallSword' : 'fall';
                   let animation = '';
                   switch(scene.equippedWeapon){
                    case 'glove': {animation = 'fallGlove'; break;}
                       case 'bow': {animation = 'fallBowDrawn'; break;}
                       case 'none': {animation = 'fall'; break;}
                       case 'sword': {animation = 'fallSwordDrawn'; break;}
                   }
                   setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
                   scene.playerWallSliding = false;
                   scene.playerIceWallSliding = false;
               }
        }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
const airPlayerAttacking = (scene: MountainScene, prevVelocity: velocity) => {
    if(scene.equippedWeapon==='sword'){
        if(scene.downAttack){
            if(scene.currentPlayerAnimation !== 'airSwing3Start' && scene.currentPlayerAnimation !== 'airSwing3Loop' && scene.currentPlayerAnimation !== 'airSwing3End'){
                //console.log('setting animation to downward airAttack');
                setNewCharacterAnimation(scene, 'airSwing3Start', scene.currentPlayerDirection==='left', false);
                //scene.stamina -= scene.attackStaminaPenalty;
            }
        }
        else if(scene.playerWallSliding){
            if(scene.currentPlayerAnimation !== 'wallSwing' && scene.stamina > 0){
                scene.stopWallSlidingPosition = {x: scene.player.x, y: scene.player.y};
                setNewCharacterAnimation(scene, 'wallSwing', scene.currentPlayerDirection==='left', false);
                scene.stamina -= scene.attackStaminaPenalty;
                scene.lastAttackTime = scene.time.now;
            }
            if(scene.stamina <= 0){
                scene.playerAttacking = false;
            }
        }
        else if((scene.currentPlayerAnimation !== 'airSwing1' && scene.currentPlayerAnimation !== 'airSwing2') && scene.time.now - scene.lastAttackTime > 500){
            //console.log('setting animation to airSwing');
            let swing = '';
            if(!scene.heavyAttack){
                swing = 'airSwing2'; 
                scene.prevSwordSwing = 'airSwing2';
            }
            else{
                swing = 'airSwing1'; 
                scene.prevSwordSwing = 'airSwing1';
                scene.heavyAttack = false;
            }
            setNewCharacterAnimation(scene, swing, scene.currentPlayerDirection==='left', false);
            scene.lastAttackTime = scene.time.now; 
            //scene.stamina -= scene.attackStaminaPenalty;
        }
    }
    else if(scene.equippedWeapon==='none'){
        if(scene.currentPlayerAnimation!=='airKick' && scene.time.now - scene.lastAttackTime > 500){
            setNewCharacterAnimation(scene, 'airKick', scene.currentPlayerDirection==='left', false);
        }            
    }
    else if(scene.equippedWeapon==='bow'){
        if(scene.currentPlayerAnimation==='jumpHoldLoop' || scene.currentPlayerAnimation==='fallHoldLoop'){
            if(scene.bowRelease){
                let animation = '';
                switch(scene.currentPlayerAnimation){
                    case 'jumpHoldLoop': { animation = 'jumpRelease'; break; }
                    case 'fallHoldLoop': { animation = 'fallRelease'; break; }
                }
                setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
            }
            else if(scene.currentPlayerAnimation==='jumpHoldLoop' && prevVelocity.y >= 0){
                setNewCharacterAnimation(scene, 'fallHoldLoop', scene.currentPlayerDirection==='left', false);
            }
            else{
                if(scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection==='right'){
                    setNewCharacterAnimation(scene, scene.currentPlayerAnimation, true, false);
                }
                else if(scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection==='left'){
                    setNewCharacterAnimation(scene, scene.currentPlayerAnimation, false, false);
                }
            }
        }
        else if(scene.currentPlayerAnimation==='jumpNotch' || scene.currentPlayerAnimation==='fallNotch'){
            if(scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection==='right'){
                setNewCharacterAnimation(scene, scene.currentPlayerAnimation, true, false);
            }
            else if(scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection==='left'){
                setNewCharacterAnimation(scene, scene.currentPlayerAnimation, false, false);
            }              
        }
        else if(scene.currentPlayerAnimation==='jumpRelease' || scene.currentPlayerAnimation==='fallRelease'){
            if(scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection==='right'){
                setNewCharacterAnimation(scene, scene.currentPlayerAnimation, true, false);
            }
            else if(scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection==='left'){
                setNewCharacterAnimation(scene, scene.currentPlayerAnimation, false, false);
            }             
        }
        else if(!scene.bowAttacks.includes(scene.currentPlayerAnimation)){
            let animation = '';
            switch(scene.currentPlayerAnimation){
                case 'jumpBowDrawn': { animation = 'jumpNotch'; break; }
                case 'fallBowDrawn': { animation = 'fallNotch'; break; }
            }
            setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
        }
    }
    else if(scene.equippedWeapon==='glove'){
        if(scene.mana <= 0){
            scene.playerAttacking = false;
            scene.stopCasting = false;
            //scene.regenMana = true;
        }
        else if(!scene.magicAttacks.includes(scene.currentPlayerAnimation)){
            let animation = '';
            switch(scene.currentPlayerAnimation){
                case 'wallSlideGlove': {animation = 'wallSlideCast'; break;}
                case 'jumpGlove': { animation = 'jumpCast'; break; }
                case 'fallGlove':
                default: { animation = 'fallCast'; break; }
            }
            setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
        }
        else if(scene.currentPlayerAnimation==='wallSlideCast' || scene.currentPlayerAnimation==='wallSlideCastLoop'){
            if(scene.currentPlayerAnimation==='wallSlideCast'){
                if(scene.player.anims.currentFrame.isLast){
                    scene.stopCasting = true;
                }
                else{
                    scene.stopCasting = false;
                } 
            }
            else if(scene.currentPlayerAnimation==='wallSlideCastLoop'){
                if(!scene.holdingCast){
                    scene.playerAttacking = false;
                }
            }

            //jump off the wall
            if(scene.controlConfig.jumpControl.isDown && scene.controlConfig.jumpControl.timeDown > scene.prevJumpTime && scene.stamina > 0){
                //console.log('jump off wall');
                //flip the players direction cause they were facing the opposite way when on the wall
                scene.currentPlayerDirection = scene.currentPlayerDirection==='left' ? 'right' : 'left';

                scene.stopWallSlidingPosition = {x: scene.player.x, y: scene.player.y};
                setNewCharacterAnimation(scene, 'jumpCastLoop', scene.currentPlayerDirection==='left', false);
                //console.log('player direction at tiem of wall jump:', scene.currentPlayerDirection);

                const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
                const jumpX = factor*scene.playerSpeed;
                const jumpY = scene.playerIceWallSliding ? scene.playerIceJumpHeight : scene.playerWallJumpHeight;
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, jumpX, jumpY);  
                
                scene.playerCanJump = false;        
                scene.playerWallSliding = false;
                scene.playerIceWallSliding = false;   
                scene.playerWallJumping = true;  
                scene.wallJumpOffPosition = {x: scene.player.x, y: scene.player.y};  
                scene.prevJumpTime = scene.controlConfig.jumpControl.timeDown;

                scene.inContactWithWall = false;
            }
        }
        else if(scene.playerWallSliding){
            scene.playerAttacking = false;
        }
        else if(scene.currentPlayerAnimation==='jumpCast'){
            if(prevVelocity.y >= 0){
                const currentFrameIndex = scene.player.anims.currentFrame.index - 1;
                setNewCharacterAnimation(scene, 'fallCast', scene.currentPlayerDirection==='left', false, currentFrameIndex);                
            }
            else if(scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection==='right'){
                const currentFrameIndex = scene.player.anims.currentFrame.index - 1;
                setNewCharacterAnimation(scene, 'jumpCast', true, false, currentFrameIndex);                
            }
            else if(scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection==='left'){
                const currentFrameIndex = scene.player.anims.currentFrame.index - 1;
                setNewCharacterAnimation(scene, 'jumpCast', false, false, currentFrameIndex);
            }

            if(scene.player.anims.currentFrame.isLast){
                scene.stopCasting = true;
            }
            else{
                scene.stopCasting = false;
            } 

        }
        else if(scene.currentPlayerAnimation==='fallCast'){
            if(scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection==='right'){
                const currentFrameIndex = scene.player.anims.currentFrame.index - 1;
                setNewCharacterAnimation(scene, 'fallCast', true, false, currentFrameIndex);                
            }
            else if(scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection==='left'){
                const currentFrameIndex = scene.player.anims.currentFrame.index - 1;
                setNewCharacterAnimation(scene, 'fallCast', false, false, currentFrameIndex);
            }

            if(scene.player.anims.currentFrame.isLast){
                scene.stopCasting = true;
            }
            else{
                scene.stopCasting = false;
            }           
        }
        else if(scene.currentPlayerAnimation==='jumpCastLoop' || scene.currentPlayerAnimation==='fallCastLoop'){
            if(!scene.holdingCast){
                scene.playerAttacking = false;
                scene.stopCasting = true;
            }
            else if(scene.currentPlayerAnimation==='jumpCastLoop' && prevVelocity.y >= 0){
                setNewCharacterAnimation(scene, 'fallCastLoop', scene.currentPlayerDirection==='left', false);
            }
            else if(scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection==='right'){
                setNewCharacterAnimation(scene, scene.currentPlayerAnimation, true, false);
            }
            else if(scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection==='left'){
                setNewCharacterAnimation(scene, scene.currentPlayerAnimation, false, false);
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
const airDrawSheath = (scene: MountainScene) => {
    if(scene.drawSword && !scene.swordDraws.includes(scene.currentPlayerAnimation)){
        let animation = '';
        switch(scene.currentPlayerAnimation){
            case 'jumpSword': {animation = 'jumpSwordDraw'; break;}
            case 'wallSlideSword': {animation = 'wallSwordDraw'; break;}
            case 'ledgeGrabSword': {animation = 'ledgeSwordDraw'; break;}
            case 'fallSword': {animation = 'fallSwordDraw'; break;}
        }
        //console.log('changing animation to some draw');
        setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
    }
    else if(scene.sheathSword && !scene.swordSheaths.includes(scene.currentPlayerAnimation)){
        let animation = '';
        switch(scene.currentPlayerAnimation){
            case 'jumpSwordDrawn': {animation = 'jumpSwordSheath'; break;}
            case 'wallSlideSwordDrawn': {animation = 'wallSwordSheath'; break;}
            case 'ledgeGrabSwordDrawn': {animation = 'ledgeSwordSheath'; break;}
            case 'fallSwordDrawn': {animation = 'fallSwordSheath'; break;}
        } 
        setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
    }
    else if(scene.controlConfig.leftControl.isDown && scene.currentPlayerDirection==='right'){
        //const currentFrameIdx = scene.player.anims.currentFrame.index;
        setNewCharacterAnimation(scene, scene.currentPlayerAnimation, true, false);
    }
    else if(scene.controlConfig.rightControl.isDown && scene.currentPlayerDirection==='left'){
        //const currentFrameIdx = scene.player.anims.currentFrame.index;
        setNewCharacterAnimation(scene, scene.currentPlayerAnimation, false, false);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
const playerLedgeGrabbing = (scene: MountainScene, prevVelocity: velocity) => {
    if(scene.stamina===0){
        scene.player.setIgnoreGravity(false);
        scene.player.setPosition(scene.player.body.position.x-5, scene.player.body.position.y);
        //const animationName = scene.swordDrawn ? 'fallSword' : 'fall';
        let animation = '';
        switch(scene.equippedWeapon){
            case 'glove': {animation = 'fallGlove'; break;}
            case 'bow': {animation = 'fallBowDrawn'; break;}
            case 'none': {animation = 'fall'; break;}
            case 'sword': {animation = 'fallSwordDrawn'; break;}
        }
        setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
        scene.playerLedgeGrab = false;
        scene.playerLedgeClimb = false;
    }
    else if(scene.currentPlayerAnimation!=='ledgeGrab' && scene.currentPlayerAnimation!=='ledgeGrabSword' && scene.currentPlayerAnimation!=='ledgeGrabSwordDrawn' && scene.currentPlayerAnimation!=='ledgeGrabBowDrawn' && scene.currentPlayerAnimation!=='ledgeGrabGlove' && scene.playerLedgeGrab){
        //const animationName = scene.swordDrawn ? 'ledgeGrabSword' : 'ledgeGrab';
        let animation = '';
        switch(scene.equippedWeapon){
            case 'glove': {animation = 'ledgeGrabGlove'; break;}
            case 'bow': {animation = 'ledgeGrabBowDrawn'; break;}
            case 'none': {animation = 'ledgeGrab'; break;}
            case 'sword': {animation = 'ledgeGrabSwordDrawn'; break;}
        }           
        setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
        scene.player.setIgnoreGravity(true);
    }
    else if(scene.currentPlayerAnimation!=='jump' && scene.currentPlayerAnimation!=='jumpSword' && scene.currentPlayerAnimation!=='jumpSwordDrawn' && scene.currentPlayerAnimation!=='jumpBowDrawn' && scene.currentPlayerAnimation!=='jumpGlove' && scene.controlConfig.jumpControl.isDown && scene.stamina > 0){
        //console.log('setting to ledge climb');
        scene.playerLedgeGrab = false;
        scene.playerLedgeClimb = true;

        let animation = '';
        switch(scene.equippedWeapon){
            case 'glove': {animation = 'jumpGlove'; break;}
            case 'bow': {animation = 'jumpBowDrawn'; break;}
            case 'none': {animation = 'jump'; break;}
            case 'sword': {animation = 'jumpSwordDrawn'; break;}
        }
        setNewCharacterAnimation(scene, animation, scene.currentPlayerDirection==='left', false);
        scene.player.once('animationcomplete', (animation, frame) => {
            if(animation.key==='jump' || animation.key==='jumpSword' || animation.key==='jumpSwordDrawn' || animation.key==='jumpBowDrawn' || animation.key==='jumpGlove'){
                scene.playerLedgeClimb = false;
            }
        }, scene);
        //setNewCharacterAnimation(scene, 'ledgeClimb', scene.currentPlayerDirection==='left', false);
        const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
        scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, 0, -1 * scene.playerJumpHeight);
        const tween = scene.tweens.add({
            targets: scene.player,
            onComplete: () => {
                console.log('tween finished, in callback');
                scene.playerLedgeClimb = false;
            },
            onCompleteScope: scene,
            duration: 290,
            //y: scene.player.body.position.y-43,
            //y: scene.player.body.position.y - 130,
            x: scene.player.body.position.x+(factor * 90)
        });


        if(scene.currentPlayerDirection==='right'){
            scene.input.keyboard.once('keydown-LEFT', () => {
                if(tween.isPlaying()){
                    tween.stop();
                    const velY = scene.player.body.velocity.y;
                    setNewCharacterAnimation(scene, animation, true, false);
                    scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, -1*scene.playerSpeed, velY); 
                    prevVelocity.y = -1 * scene.playerJumpHeight;
                }
                scene.playerLedgeClimb = false;
            });
            if(scene.controlConfig.leftControl.isDown){
                tween.stop();
                setNewCharacterAnimation(scene, animation, true, false);
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, -1*scene.playerSpeed, scene.player.body.velocity.y); 
                prevVelocity.y = -1 * scene.playerJumpHeight;
                scene.playerLedgeClimb = false;
            }
        }
        else if(scene.currentPlayerDirection==='left'){
            scene.input.keyboard.once('keydown-RIGHT', () => {
                if(tween.isPlaying()){
                    tween.stop();
                    const velY = scene.player.body.velocity.y;
                    setNewCharacterAnimation(scene, animation, false, false);
                    scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, scene.playerSpeed, velY); 
                    prevVelocity.y = -1 * scene.playerJumpHeight;
                }
                scene.playerLedgeClimb = false;
            });
            if(scene.controlConfig.rightControl.isDown){
                tween.stop();
                setNewCharacterAnimation(scene, animation, false, false);
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, scene.playerSpeed, scene.player.body.velocity.y); 
                prevVelocity.y = -1 * scene.playerJumpHeight;
                scene.playerLedgeClimb = false;
            }
        }

        //scene.player.setVelocity(0, -1*scene.playerJumpHeight*0.8);
        //scene.player.setIgnoreGravity(true);
    }     
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
const setAirVelocity = (scene: MountainScene, prevVelocity: velocity) => {
    //set the characters speed depending on the active animation and active direction
    switch(scene.currentPlayerAnimation){
        case 'wallSlideSword':
        case 'wallSlideSwordDrawn':
        case 'wallSlideBowDrawn':
        case 'wallSwing':
        case 'wallSlideGlove':
        case 'wallSlide': {
            const factor = scene.currentPlayerDirection==='left' ? -1 : 1;
            scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, factor*0.5, prevVelocity.y);
            break;
        }
        case 'ledgeGrab':
        case 'ledgeGrabGlove':
        case 'ledgeGrabSwordDrawn':
        case 'ledgeGrabBowDrawn':
        case 'ledgeGrabSword': {
            scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, 0, 0);
            break;
        }
        case 'airSwing3Start':
        case 'airSwing3Loop': {
            scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, 0, scene.playerMaxSpeed);
            break;
        }
        case 'fallHoldLoop': {
            if(scene.inContactWithWall){
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, 0, prevVelocity.y);
                break;
            }
        }
       // case 'jumpGlove':
        case 'jumpCast':
        case 'fallCast':
        case 'jumpCastLoop': {
            if(scene.prevPlayerAnimation==='wallSlideCastLoop'){
                break;
            }
        }
        case 'fallCastLoop':
        case 'airSwing1':
        case 'airSwing2':
        case 'jumpSwordDraw':
        case 'jumpSwordSheath':
        case 'jumpNotch':
        case 'fallNotch':
        case 'fallSword':
        case 'fallGlove':
        case 'fallSwordDraw':
        case 'fallSwordSheath':
        case 'fallSwordDrawn':
        case 'fallBowDrawn':
        case 'jumpHoldLoop':
        case 'fallRelease':
        case 'jumpRelease':
        case 'airKick':
        case 'fall': {
            if(scene.currentPlayerDirection==='right' && scene.controlConfig.rightControl.isDown){
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, scene.playerSpeed, prevVelocity.y);
                break;
            }
            else if(scene.currentPlayerDirection==='left' && scene.controlConfig.leftControl.isDown){
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, -1*scene.playerSpeed, prevVelocity.y);
                break;
            }
            else{
                scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, 0, prevVelocity.y);
                break;
            }
        }
        case 'jumpSword':
        case 'jumpSwordDrawn':
        case 'jumpBowDrawn':
        case 'jumpGlove':
        case 'jump': {
            if(!scene.playerLedgeClimb){
                if(scene.controlConfig.rightControl.isDown && !scene.playerWallJumping){
                    //scene.currentPlayerDirection = 'right';
                    scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, scene.playerSpeed, prevVelocity.y);
                    break;
                }
                else if(scene.controlConfig.leftControl.isDown && !scene.playerWallJumping){
                    //scene.currentPlayerDirection = 'left';
                    scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, -1*scene.playerSpeed, prevVelocity.y);
                    break;
                }
                else if(scene.playerWallJumping){
                    const factor = scene.currentPlayerDirection==='left' ? 1 : -1;
                    //scene.matter.setVelocity(scene.player.body as Phaser.Types.Physics.Matter.MatterBody, factor*scene.playerSpeed, -2.5*scene.playerSpeed); 
                }
            }
        }
        default: break;
    }
}

const setNewCharacterAnimation = (scene: MountainScene, animationName: string, flipX: boolean, flipY: boolean, startFrameIndex = 0) => {
    scene.player.setScale(1);

    console.log('animation name:', animationName);
    if(animationName===scene.currentPlayerAnimation){
        //console.trace();
    }

    let bodyData = null;
    switch(animationName){
        case 'idle': {bodyData = scene.characterShapes.adventurer_idle_00; break;}
        case 'run': {bodyData = scene.characterShapes.adventurer_run_00; break;}
        case 'jump': {bodyData = scene.characterShapes.adventurer_jump_00; break;}
        case 'wallSlide': {bodyData = scene.characterShapes.adventurer_wallSlide_00; break;}
        case 'ledgeGrab': {bodyData = scene.characterShapes.adventurer_ledgeGrab_00; break;}
        case 'fall': {bodyData = scene.characterShapes.adventurer_fall_00; break;}
        case 'punch1': {bodyData = scene.characterShapes.adventurer_punch1_00; break;}
        case 'punch2': {bodyData = scene.characterShapes.adventurer_punch2_00; break;}
        case 'punch3': {bodyData = scene.characterShapes.adventurer_punch3_00; break;}
        case 'runPunch': {bodyData = scene.characterShapes.adventurer_runPunch_00; break;}
        case 'groundKick': {bodyData = scene.characterShapes.adventurer_groundKick_00; break;}
        case 'airKick': {bodyData = scene.characterShapes.adventurer_airKick_00; break;}
        case 'idleSword': {bodyData = scene.characterShapes.adventurer_idleSword_00; break;}
        case 'runSword': {bodyData = scene.characterShapes.adventurer_runSword_00; break;}
        case 'jumpSword': {bodyData = scene.characterShapes.adventurer_jumpSword_00; break;}
        case 'wallSlideSword': {bodyData = scene.characterShapes.adventurer_wallSlideSword_00; break;}
        case 'ledgeGrabSword': {bodyData = scene.characterShapes.adventurer_ledgeGrabSword_00; break;}
        case 'fallSword': {bodyData = scene.characterShapes.adventurer_fallSword_00; break;}
        case 'idleSwordDrawn': {bodyData = scene.characterShapes.adventurer_idleSwordDrawn_00; break;}
        case 'runSwordDrawn': {bodyData = scene.characterShapes.adventurer_runSwordDrawn_00; break;}
        case 'jumpSwordDrawn': {bodyData = scene.characterShapes.adventurer_jumpSwordDrawn_00; break;}
        case 'wallSlideSwordDrawn': {bodyData = scene.characterShapes.adventurer_wallSlideSwordDrawn_00; break;}
        case 'ledgeGrabSwordDrawn': {bodyData = scene.characterShapes.adventurer_ledgeGrabSwordDrawn_00; break;}
        case 'fallSwordDrawn': {bodyData = scene.characterShapes.adventurer_fallSwordDrawn_00; break;}
        case 'idleSwordDraw': {bodyData = scene.characterShapes.adventurer_idleSwordDraw_00; break;}
        case 'runSwordDraw': {bodyData = scene.characterShapes.adventurer_runSwordDraw_00; break;}
        case 'jumpSwordDraw': {bodyData = scene.characterShapes.adventurer_jumpSwordDraw_00; break;}
        case 'fallSwordDraw': {bodyData = scene.characterShapes.adventurer_fallSwordDraw_00; break;}
        case 'wallSwordDraw': {bodyData = scene.characterShapes.adventurer_wallSwordDraw_00; break;}
        case 'ledgeSwordDraw': {bodyData = scene.characterShapes.adventurer_ledgeSwordDraw_00; break;}
        case 'idleSwordSheath': {bodyData = scene.characterShapes.adventurer_idleSwordSheath_00; break;}
        case 'runSwordSheath': {bodyData = scene.characterShapes.adventurer_runSwordSheath_00; break;}
        case 'jumpSwordSheath': {bodyData = scene.characterShapes.adventurer_jumpSwordSheath_00; break;}
        case 'fallSwordSheath': {bodyData = scene.characterShapes.adventurer_fallSwordSheath_00; break;}
        case 'wallSwordSheath': {bodyData = scene.characterShapes.adventurer_wallSwordSheath_00; break;}
        case 'ledgeSwordSheath': {bodyData = scene.characterShapes.adventurer_ledgeSwordSheath_00; break;}
        case 'idleSwing1': {bodyData = scene.characterShapes.adventurer_idleSwing1_00; break;}
        case 'idleSwing2': {bodyData = scene.characterShapes.adventurer_idleSwing2_00; break;}
        case 'runSwing': {bodyData = scene.characterShapes.adventurer_runSwing_00; break;}
        case 'airSwing1': {bodyData = scene.characterShapes.adventurer_airSwing1_00; break;}
        case 'airSwing2': {bodyData = scene.characterShapes.adventurer_airSwing2_00; break;}
        case 'airSwing3Start': {bodyData = scene.characterShapes.adventurer_airSwing3Start_00; break;}
        case 'airSwing3Loop': {bodyData = scene.characterShapes.adventurer_airSwing3Loop_00; break;}
        case 'airSwing3End': {bodyData = scene.characterShapes.adventurer_airSwing3End_00; break;}
        case 'wallSwing': {bodyData = scene.characterShapes.adventurer_wallSwing_00; break;}
        case 'idleBowDrawn': {bodyData = scene.characterShapes.adventurer_idleBowDrawn_00; break;}
        case 'runBowDrawn': {bodyData = scene.characterShapes.adventurer_runBowDrawn_00; break;}
        case 'jumpBowDrawn': {bodyData = scene.characterShapes.adventurer_jumpBowDrawn_00; break;}
        case 'wallSlideBowDrawn': {bodyData = scene.characterShapes.adventurer_wallSlideBowDrawn_00; break;}
        case 'ledgeGrabBowDrawn': {bodyData = scene.characterShapes.adventurer_ledgeGrabBowDrawn_00; break;}
        case 'fallBowDrawn': {bodyData = scene.characterShapes.adventurer_fallBowDrawn_00; break;}
        case 'idleNotch': {bodyData = scene.characterShapes.adventurer_idleNotch_00; break;}
        case 'runNotch': {bodyData = scene.characterShapes.adventurer_runNotch_00; break;}
        case 'jumpNotch': {bodyData = scene.characterShapes.adventurer_jumpNotch_00; break;}
        case 'fallNotch': {bodyData = scene.characterShapes.adventurer_fallNotch_00; break;}
        case 'idleHoldLoop': {bodyData = scene.characterShapes.adventurer_idleHoldLoop_00; break;}
        case 'runHoldLoop': {bodyData = scene.characterShapes.adventurer_runHoldLoop_00; break;}
        case 'jumpHoldLoop': {bodyData = scene.characterShapes.adventurer_jumpHoldLoop_00; break;}
        case 'fallHoldLoop': {bodyData = scene.characterShapes.adventurer_fallHoldLoop_00; break;}
        case 'idleRelease': {bodyData = scene.characterShapes.adventurer_idleRelease_00; break;}
        case 'runRelease': {bodyData = scene.characterShapes.adventurer_runRelease_00; break;}
        case 'jumpRelease': {bodyData = scene.characterShapes.adventurer_jumpRelease_00; break;}
        case 'fallRelease': {bodyData = scene.characterShapes.adventurer_fallRelease_00; break;}
        case 'idleGlove': {bodyData = scene.characterShapes.adventurer_idleGlove_00; break;}
        case 'runGlove': {bodyData = scene.characterShapes.adventurer_runGlove_00; break;}
        case 'jumpGlove': {bodyData = scene.characterShapes.adventurer_jumpGlove_00; break;}
        case 'fallGlove': {bodyData = scene.characterShapes.adventurer_fallGlove_00; break;}
        case 'ledgeGrabGlove': {bodyData = scene.characterShapes.adventurer_ledgeGrabGlove_00; break;}
        case 'wallSlideGlove': {bodyData = scene.characterShapes.adventurer_wallSlideGlove_00; break;}
        case 'idleCast': {bodyData = scene.characterShapes.adventurer_idleCast_00; break;}
        case 'idleCastLoop': {bodyData = scene.characterShapes.adventurer_idleCastLoop_00; break;}
        case 'runCast': {bodyData = scene.characterShapes.adventurer_runCast_00; break;}
        case 'runCastLoop': {bodyData = scene.characterShapes.adventurer_runCastLoop_00; break;}
        case 'jumpCast': {bodyData = scene.characterShapes.adventurer_jumpCast_00; break;}
        case 'jumpCastLoop': {bodyData = scene.characterShapes.adventurer_jumpCastLoop_00; break;}
        case 'fallCast': {bodyData = scene.characterShapes.adventurer_fallCast_00; break;}
        case 'fallCastLoop': {bodyData = scene.characterShapes.adventurer_fallCastLoop_00; break;}
        case 'wallSlideCast': {bodyData = scene.characterShapes.adventurer_wallSlideCast_00; break;}
        case 'wallSlideCastLoop': {bodyData = scene.characterShapes.adventurer_wallSlideCastLoop_00; break;}
        default: break;
    }

    scene.playerBody = scene.matter.add.fromPhysicsEditor(scene.player.x, scene.player.y, bodyData, undefined, false);
    scene.playerBody.friction = scene.playerFriction;

    scene.player.setExistingBody(scene.playerBody);

    scene.player.setScale((flipX ? -1 : 1)*scene.playerScaleFactor, 
                          (flipY ? -1 : 1)*scene.playerScaleFactor);

    scene.player.play(animationName, true, startFrameIndex);
    scene.prevPlayerAnimation = scene.currentPlayerAnimation;
    scene.currentPlayerAnimation = animationName;

    scene.prevPlayerDirection = scene.currentPlayerDirection;
    scene.currentPlayerDirection = flipX ? 'left' : 'right';

    scene.player.setBounce(0);
    scene.player.setFixedRotation(); 
    scene.player.setCollisionGroup(-1);
}
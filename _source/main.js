$(function() {
  let cooldown = false,
      isAMPM = false,
      isAnalog = false,
      isAlarmDialogueVisible = false,
      isAlarmSet = false,
      alarmTime = {
        hour: 00,
        min: 00
      };
  
  const notification = new Audio;
  notification.src = "./sound.mp3";
  
  $(".time").text(Date().split(" ")[4].split(":")[0] + ":" + Date().split(" ")[4].split(":")[1]);
  
  function timeUpdate(){
    
    isAMPM ? Date().split(" ")[4].split(":")[0] >= 12 ? $(".time").text(Math.abs(parseInt(Date().split(" ")[4].split(":")[0], 10) - 12).toString() + ":" + Date().split(" ")[4].split(":")[1]) : $(".time").text(Date().split(" ")[4].split(":")[0] + ":" + Date().split(" ")[4].split(":")[1]) : $(".time").text(Date().split(" ")[4].split(":")[0] + ":" + Date().split(" ")[4].split(":")[1]);
    
    Date().split(" ")[4].split(":")[0] >= 12 ? $(".ampm-icon").text("PM") : $(".ampm-icon").text("AM");
    
    isAnalog ? setAnalogTime() : null;
    
    isAlarmSet ? cooldown ? null : parseInt(Date().split(" ")[4].split(":")[1], 10) == alarmTime.min && parseInt(Date().split(" ")[4].split(":")[0], 10) == alarmTime.hour ? highlight() : null : null;
    
    isAlarmSet ? setAlarmUI() : $(".alarm-time").removeClass("active");
    
    requestAnimationFrame(timeUpdate);
  };
    
  function setAnalogTime(){
    $(".needle-short").css("transform", "rotateZ(" +  (parseInt(Date().split(" ")[4].split(":")[0] * 30, 10) + parseInt(Date().split(" ")[4].split(":")[1] * 0.5, 10)).toString() + "deg)");
    $(".needle-long").css("transform", "rotateZ(" + Date().split(" ")[4].split(":")[1] * 6 + "deg)");
  };
    
  function setAlarmUI(){
    $(".alarm-time").text(("0" + alarmTime.hour).slice(-2) + ":" + ("0" + alarmTime.min).slice(-2))
                    .addClass("active");
  }
  
  function setCooldown(){
    cooldown = true;
    setTimeout(function(){
      cooldown = false;
    }, 60000);
  };
  
  function highlight(){
    setCooldown();
    notification.play();
    isAnalog ? $(".time").addClass("highlighted-analog") : $(".time").addClass("highlighted");
    $(".clock-background").addClass("highlighted");
    setTimeout(function(){
      $(".time").removeClass("highlighted");
      $(".time").removeClass("highlighted-analog");
      $(".clock-background").removeClass("highlighted");
    }, 2000);
  };
  
  timeUpdate();
//  setCooldown();
  
  $(".setting, .alarm, .ampm, .analog").click(function(){
    $(this).toggleClass("active");
  });
  
  $(".alarm").click(function(){
    isAlarmDialogueVisible = !isAlarmDialogueVisible;
    if(isAlarmDialogueVisible){
      $(this).addClass("lock");
      $(".alarm-dialogue").addClass("active");
      setTimeout(function(){
        $(".alarm-dialogue").addClass("deploy");
        setTimeout(function(){
          $(".alarm-dialogue").addClass("deploy-2");
          setTimeout(function(){
            $(".alarm").removeClass("lock");
            $('[class*="alarm-dialogue"]').addClass("active");
          }, 500);
        }, 300);
      }, 600);
    }else{
      $('[class*="alarm-dialogue-"]').removeClass("active");
      $(this).addClass("lock");
      setTimeout(function(){
        $(".alarm-dialogue").removeClass("deploy-2");
        setTimeout(function(){
          $(".alarm-dialogue").removeClass("deploy");
          setTimeout(function(){
            $(".alarm-dialogue").removeClass("active");
            $(".alarm").removeClass("lock");
          }, 300);
        }, 600);
      }, 500);
    }
  });
  
  $(".setting").click(function(){
    
    $(".ampm").toggleClass("visible");
    
    setTimeout(function(){
      
      $(".develop").toggleClass("visible");
      
      setTimeout(function(){
        
        $(".analog").toggleClass("visible");
      
      }, 200);
    }, 200);
    
  });
  
  $(".ampm").click(function(){
    isAMPM = !isAMPM;
  });
  
  $(".analog").click(function(){
    isAnalog = !isAnalog;
    $("[class*='needle']").toggleClass("active");
    $(".time").toggleClass("disabled");
  });
  
  $(".develop").click(function(){
    highlight();
  });
  
  $("[class*='alarm-dialogue-timer']").keyup(function(){
    $(this).val().length > 2 ? $(this).val($(this).val().substr(0, 2)) : null;
    
  });
  
  $(".alarm-dialogue-timer-1").keyup(function(){
    parseInt($(this).val(), 10) > 23 ? $(this).val("00") : null;
  });
  
  $(".alarm-dialogue-timer-2").keyup(function(){
    parseInt($(this).val(), 10) > 59 ? $(this).val("00") : null;
  });
  
  $(".alarm-dialogue-selection-set").click(function(){
    alarmTime.hour = parseInt($(".alarm-dialogue-timer-1").val(), 10);
    alarmTime.min = parseInt($(".alarm-dialogue-timer-2").val(), 10);
    
    isAlarmSet = true;
  });
  
  $(".alarm-dialogue-selection-off").click(function(){
    isAlarmSet = false;
  });
});
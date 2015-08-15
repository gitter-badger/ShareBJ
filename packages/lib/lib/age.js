moment.locale('zh-cn');

conceptionAge = function(conceptionDate){
    if(conceptionDate instanceof Date){
        var now = new Date();
        var timeSpan = now.getTime() - conceptionDate.getTime() ;
        var weeks = Math.floor(timeSpan/1000/60/60/24/7);
        var days = Math.ceil(timeSpan/1000/60/60/24) - weeks*7;


        return [weeks,days,weeks+'周' + (days?'+'+days:'')];
    }
    return null;
};

ageOf = function(birthDate) {
    if(birthDate instanceof Date){
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var months = today.getMonth() - birthDate.getMonth();
        var days = today.getDate() - birthDate.getDate();
        if(days <0  )
        {
            months--;
        }

        if(months <0 || (months ===0 && days < 0 )){
            age--;
            months += 12;
        }

        var ageText = '';
        if(age != 0)
        {
            ageText = age + '岁';
        }

        if(months != 0){
            ageText += months + '个月';
        }

        if(days != 0){
            ageText += days + '天';
        }
        return [age,months,days, ageText];
    }
    return null;
};


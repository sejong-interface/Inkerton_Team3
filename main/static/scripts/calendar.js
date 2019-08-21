var selectedMonth = new Date().getMonth() + 1;

window.addEventListener("load", function (){
    let calendarContainer = document.querySelector("#calendar");
    let dateWeight = new Array();
    let codeWeight = new Array();
    let days = calendarContainer.querySelectorAll(".fc-day");
    let minDate, maxDate;
    let adjacentSchedule;

    initializer(calendarContainer);

    minDate = new Date(days[0].getAttribute("data-date"));
    maxDate = new Date(days[days.length - 1].getAttribute("data-date"));

    days = null;

    adjacentSchedule = getAdjacentSchedule(getData()); //서버에서 바로 '선택된 달의 양 옆으로 한 달' 내에 있는 스케쥴을 가져올 수 있다면,
                                                            //이 코드를 '삭제'하고, 11번째 줄의 adjacentSchedule에 바로 그 스케쥴 배열을 넣을 것
    adjacentSchedule = sortArray(adjacentSchedule);

    for(let schedule of adjacentSchedule){
        let dateBox;
        let flag = false;
        let startDate = new Date(schedule.startDate);
        let endDate = new Date(schedule.endDate);

        codeWeight["'" + schedule.code + "'"] = 1;

        while(startDate.getDate() != endDate.getDate()){
            let month = startDate.getMonth() + 1;
            let date = startDate.getDate();

            if(!flag){
                if(minDate.getMonth() + 1 == month){
                    if(minDate.getDate() > date){ //earlier than calendar
                        startDate.setDate(minDate.getDate());
                        flag = true;
                        continue;
                    }
                    else flag = true;
                }
                else flag = true;
            }
            if(maxDate.getMonth() + 1 == month){
                if(maxDate.getDate() < date){ //later than calendar
                    flag = false;
                    break;
                }
            }

            if(month < 10) month = "0" + month;
            if(date < 10) date = "0" + date;
            
            dateBox = calendarContainer.querySelector("td[data-date = '" + startDate.getFullYear() + "-" + month + "-" + date + "']");

            if(dateBox != null){
                adjustSchedulePosition(dateBox.getAttribute("data-date"), schedule, dateWeight, codeWeight);
            }

            startDate.setDate(startDate.getDate() + 1);
        }
        if(flag || startDate.getDate() == endDate.getDate()){
            dateBox = calendarContainer.querySelector("td[data-date = '" + schedule.endDate + "']");
            adjustSchedulePosition(dateBox.getAttribute("data-date"), schedule, dateWeight, codeWeight);
        }
    }

    for(let schedule of adjacentSchedule){
        let dateBox;
        let flag = false;
        let startDate = new Date(schedule.startDate);
        let endDate = new Date(schedule.endDate);

        while(startDate.getDate() != endDate.getDate()){
            let month = startDate.getMonth() + 1;
            let date = startDate.getDate();

            if(!flag){
                if(minDate.getMonth() + 1 == month){
                    if(minDate.getDate() > date){ //earlier than calendar
                        startDate.setDate(minDate.getDate());
                        flag = true;
                        continue;
                    }
                    else flag = true;
                }
                else flag = true;
            }
            if(maxDate.getMonth() + 1 == month){
                if(maxDate.getDate() < date){ //later than calendar
                    flag = false;
                    break;
                }
                else true;
            }

            if(month < 10) month = "0" + month;
            if(date < 10) date = "0" + date;
            
            dateBox = calendarContainer.querySelector("td[data-date = '" + startDate.getFullYear() + "-" + month + "-" + date + "']");
            renderSchedule(dateBox, schedule, codeWeight);
            startDate.setDate(startDate.getDate() + 1);
        }
        if(flag || startDate.getDate() == endDate.getDate()){
            dateBox = calendarContainer.querySelector("td[data-date = '" + schedule.endDate + "']");
            renderSchedule(dateBox, schedule, codeWeight);
        }
    }
});

function renderSchedule(targetElement, schedule, codeWeight){
    let scheduleDiv = document.createElement("div");

    scheduleDiv.style.top = (15 * codeWeight["'" + schedule.code + "'"]) + "px";
    //console.log(codeWeight["'" + schedule.code + "'"]);
    scheduleDiv.style.width = targetElement.clientWidth + "px";
    scheduleDiv.className += " " + schedule.code;
    scheduleDiv.addEventListener("mouseover", emphasizeSchedule);
    scheduleDiv.addEventListener("mouseout", resetEmphasis);
    targetElement.appendChild(scheduleDiv);

    scheduleDiv.innerHTML = schedule.title;
    scheduleDiv.className += (schedule.bachelorChk)? " bachelorSchedule" : " clubSchedule";
}

function adjustSchedulePosition(dateAttribute, schedule, dateWeight, codeWeight){
    let flag = false;

    for(let i in dateWeight) if(i == dateAttribute) flag = true;
    if(flag) dateWeight[dateAttribute]++;
    else dateWeight[dateAttribute] = 1;

    codeWeight["'" + schedule.code + "'"] = (codeWeight["'" + schedule.code + "'"] < dateWeight[dateAttribute])? dateWeight[dateAttribute] : codeWeight["'" + schedule.code + "'"];
}

function getAdjacentSchedule(scheduleList){ //서버에서 바로 '선택된 달의 양 옆으로 한 달' 내에 있는 스케쥴을 가져올 수 있다면,
                                            //이 함수를 지울것
    let adjacentSchedule = new Array();
    
    for(let schedule of scheduleList){
        let startMonth = new Date(schedule.startDate).getMonth() + 1;
        let endMonth = new Date(schedule.endDate).getMonth() + 1;

        if((startMonth >= selectedMonth && selectedMonth + 1 >= startMonth) || (startMonth <= selectedMonth && selectedMonth - 1 <= startMonth)){
            adjacentSchedule.push(schedule);
        }
        else if((endMonth >= selectedMonth && selectedMonth + 1 >= endMonth) || (endMonth <= selectedMonth && selectedMonth - 1 <= endMonth)){
            adjacentSchedule.push(schedule);
        }
    }

    return adjacentSchedule;
}

function emphasizeSchedule(){
    let targetSchedule = document.getElementsByClassName(this.className);

    for(let element of targetSchedule){
        element.style.boxShadow = "3px 3px 1px #999";
    }
}

function resetEmphasis(){
    let targetSchedule = document.getElementsByClassName(this.className);

    for(let element of targetSchedule){
        element.style.boxShadow = "none";
    }
}

function getData(){
    let dataArr = new Array();

    for(let i = 0; i < document.querySelector("input[cnt]").getAttribute("cnt"); i++){
        let tmpArr = new Array();
        let tmpString;
        let tmpValue;

        tmpValue = document.querySelectorAll("input[startDate]")[i].getAttribute("startDate");
        tmpString = tmpValue.split(" ");
        tmpArr["startDate"] = tmpString[0].slice(0, -1) + "-" + ((parseInt(tmpString[1].slice(0, -1)) < 10)? ("0" + tmpString[1].slice(0, -1)) : tmpString[1].slice(0, -1)) + "-" + ((parseInt(tmpString[2].slice(0, -1)) < 10)? ("0" + tmpString[2].slice(0, -1)) : tmpString[2].slice(0, -1));

        tmpValue = document.querySelectorAll("input[endDate]")[i].getAttribute("endDate");
        tmpString = tmpValue.split(" ");
        tmpArr["endDate"] = tmpString[0].slice(0, -1) + "-" + ((parseInt(tmpString[1].slice(0, -1)) < 10)? ("0" + tmpString[1].slice(0, -1)) : tmpString[1].slice(0, -1)) + "-" + ((parseInt(tmpString[2].slice(0, -1)) < 10)? ("0" + tmpString[2].slice(0, -1)) : tmpString[2].slice(0, -1));

        tmpArr["bachelorChk"] = document.querySelectorAll("input[bachelorChk]")[i].getAttribute("bachelorChk");
        tmpArr["bachelorChk"] = (tmpArr["bachelorChk"] == "True")? true : false;

        tmpArr["title"] = document.querySelectorAll("input[title]")[i].getAttribute("title");
        tmpArr["code"] = document.querySelectorAll("input[code]")[i].getAttribute("code");

        dataArr.push(tmpArr);
    }

    return dataArr;
}

function initializer(calendarContainer){
    let buttons = calendarContainer.querySelector(".fc-header-toolbar");
    let titleBox = document.createElement("div");
    let guideBox = document.createElement("div");
    let bachelorBox = document.createElement("div");
    let clubBox = document.createElement("div");

    calendarContainer.removeChild(buttons);
    titleBox.id = "calendarTitle";
    titleBox.appendChild(this.document.createTextNode("금월 일정"));
    calendarContainer.insertBefore(titleBox, calendarContainer.childNodes[0]);
    
    guideBox.id = "guideBox";
    clubBox.className = "guideContents clubSchedule";
    bachelorBox.className = "guideContents bachelorSchedule";
    clubBox.appendChild(document.createTextNode("학사 일정"));
    bachelorBox.appendChild(document.createTextNode("인페 일정"));
    guideBox.appendChild(clubBox);
    guideBox.appendChild(bachelorBox);
    calendarContainer.insertBefore(guideBox, calendarContainer.childNodes[1]);
}

function sortArray(array){
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length - 1; j++){
            let tmpPrevDate = new Date(array[j]["startDate"]);
            let tmpNextDate = new Date(array[j + 1]["startDate"]);

            if(tmpPrevDate > tmpNextDate){
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
    }

    return array;
}
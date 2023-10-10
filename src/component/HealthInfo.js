import React, {useState, useCallback} from "react";
import './HealthInfo.css';

const diseaseCategories = {
    호흡기 : ['결핵','천식','비염'],
    순환기 : ['빈혈','고혈압','저혈압','임신','동맥경화증','뇌졸중'],
    피부 : ['알레르기','아토피 피부염'],
    뼈근육 : ['관절염', '골다공증'],
    내분비 : ['당뇨병','고혈당', '갑상선 질환'],
    신경 : ['어지럼증','편두통'],
    안구 : ['안구건조증']
};

function HealthInfo ({ onSelectDiseases }) {
    const [checkedList, setCheckedList] = useState([]);

    const checkedItemHandler = (value, isChecked) => {
        if (isChecked) {
        setCheckedList((prev) => [...prev, value]);
        } else if (!isChecked && checkedList.includes(value)) {
        setCheckedList(checkedList.filter((item) => item !== value));
        }
    };

    const checkHandler = (e, value) => {
        checkedItemHandler(value, e.target.checked);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSelectDiseases(checkedList);
    };

    return(
        <div className="healthInfo">
            <form onSubmit={onSubmit}>
                {Object.keys(diseaseCategories).map((category, index) => (
                    <div key={index}>
                        <p className="category-name">{category} 질환</p>
                        <div className='checkbox-group'>
                        {diseaseCategories[category].map((item, idx) => (
                            <div className='checkbox' key={idx}>
                            <input
                                className="checkbox-category"
                                type='checkbox'
                                id={item}
                                checked={checkedList.includes(item)}
                                onChange={(e) => checkHandler(e, item)}
                            />
                            <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default HealthInfo;
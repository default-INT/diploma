import React from "react";
import PropTypes from "prop-types";
import {DefaultIconBtn} from "../";
import {leftArrowBlackIcon, rightArrowBlackIcon} from "../../icons";


const PaginationBtn = ({count, size, currentPage, loadPage}) => {
    const lastPage = Math.ceil(count / size)
    const getLinks = (pageStart, pageEnd) => ({
        from: pageStart,
        to: pageEnd,

        *[Symbol.iterator]() {
            for(let value = this.from; value <= this.to; value++) {
                yield (
                    <a
                        className={`default-link ${currentPage === value ? 'current-page' : ''}`}
                        onClick={() => loadPage(value)}
                    >
                        {value}
                    </a>
                )
            }
        }
    })
    //TODO: если много данных, будет много страниц, ограничить и привести к виду 1 ... 5 6 7 ... n
    return (
        <div className='pagination-box'>
            {currentPage === 1 ? <div style={({width: 30})}/> :
                <DefaultIconBtn onClick={() => loadPage(currentPage - 1)} icon={leftArrowBlackIcon}/>}
            <div className="pages">
                {[...getLinks(1, lastPage)]}
            </div>
            {currentPage === lastPage ? <div style={({width: 30})}/> :
                <DefaultIconBtn onClick={() => loadPage(currentPage + 1)} icon={rightArrowBlackIcon}/>}

        </div>
    )
}

PaginationBtn.propTypes = {
    count: PropTypes.number,
    size: PropTypes.number,
    currentPage: PropTypes.number,
    loadPage: PropTypes.number
}

export { PaginationBtn }
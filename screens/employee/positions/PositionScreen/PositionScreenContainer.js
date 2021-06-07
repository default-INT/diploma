import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import PositionScreenView from "./PositionScreenView";
import {HeaderToggleButton} from "../../../default-options";
import {positionActions} from "../../../../store/actions";

const PositionScreenContainer = ({navigation, ...props}) => {
    const {loading : isLoading, availablePositions : positions, error } = useSelector(state => state.positions);

    const dispatch = useDispatch();

    const loadPositions = useCallback(() => {
        dispatch(positionActions.fetchPosition());
    }, [dispatch]);

    useEffect(() => {
        const unsubscribe = navigation.dangerouslyGetParent().addListener('focus', () => {
            loadPositions();
        });
        return () => {
            unsubscribe();
        }
    }, [navigation]);

    const onRefresh = () => {
        dispatch(positionActions.fetchPosition());
    }

    return (
        <PositionScreenView
            isLoading={isLoading}
            positions={positions}
            error={error}
            onRefresh={onRefresh}
        />
    )
};


export const positionScreenOptions = navData => {
    return {
        headerTitle: 'Тарифы',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        )
    }
}

export default PositionScreenContainer;
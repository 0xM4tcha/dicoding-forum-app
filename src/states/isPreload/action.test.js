/**
 * skenario test
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import api from "@/utils/api";
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncPreloadProcess, setIsPreloadActionCreator } from "./action";
import { setAuthUserActionCreator } from '../authUser/action';

const fakeAuthResponse = {
  id: "user-5s-UlbouJXw84LnN",
  name: "ggwp",
  email: "test555@gmail.com",
  avatar: "https://ui-avatars.com/api/?name=ggwp&background=random"
}
const fakeIsPreloadResponse = false;
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });
 
  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
 
    // delete backup data
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.resolve(fakeAuthResponse);
    //mock dispatch
    const dispatch = vi.fn();
 
    // action
    await asyncPreloadProcess()(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthResponse));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(fakeIsPreloadResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();
 
    // action
    await asyncPreloadProcess()(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));

  });
});
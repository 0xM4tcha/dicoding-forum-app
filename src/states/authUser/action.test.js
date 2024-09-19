/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import api from "@/utils/api";
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncSetAuthUser } from './action';

const fakeAuthResponse = {
  id: "user-5s-UlbouJXw84LnN",
  name: "ggwp",
  email: "test555@gmail.com",
  avatar: "https://ui-avatars.com/api/?name=ggwp&background=random"
}

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._login = api.login;
  });
 
  afterEach(() => {
    api.login = api._login;
 
    // delete backup data
    delete api._login;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeAuthResponse);
    //mock dispatch
    const dispatch = vi.fn();
    const spy = vi.spyOn(api, 'getOwnProfile');
 
    // action
    await asyncSetAuthUser({ email: 'test555@gmail.com', password: 'password' })(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(spy).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();
 
    // action
    await asyncSetAuthUser({ email: 'test555@gmail.com', password: 'ggwp' })(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);

  });
});
// Copyright 2018 Google LLC
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as o from "ospec";
import { dingus, Dingus } from "dingusjs";

o.spec('typescript', () => {

  o('it reports no calls initially', () => {
    const d = dingus<{}>();
    o(d.calls).deepEquals([]);
  });
  
  o('it reports a call with no arguments', () => {
    const d = dingus<() => void>();
    const result = d();
    o(d.calls).deepEquals([['()', [], result]]);
  });

  o('it types calls', () => {
    const d = dingus<() => void>();
    const result = d();
    const calls: [string, any[], Dingus] = d.calls[0];
    o(d.calls).deepEquals([['()', [], result]]);
  });

  o('it types nested', () => {
    const d = dingus<() => { bar(): {}}>('foo');
    o('' + d().bar()).equals('<Dingus(foo().bar())>');
    o(d().bar().calls).deepEquals([]);
  });

});

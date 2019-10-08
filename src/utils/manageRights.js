/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
export function hasAdminRole (role) {
  return (role === 100)
}

export function hasUserRole (role) {
  return (role >= 50)
}

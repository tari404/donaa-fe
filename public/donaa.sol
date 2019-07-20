pragma solidity ^ 0.5 .1;
contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() internal {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns(address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Returns true if the caller is the current owner.
     */
    function isOwner() public view returns(bool) {
        return msg.sender == _owner;
    }


    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns(uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns(uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns(uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns(uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns(uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}
contract ERC20 is Ownable {
    
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    event Transfer(address indexed from, address indexed to, uint256 value);


    uint256 private _totalSupply;

    /**
     * @dev See `IERC20.totalSupply`.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See `IERC20.balanceOf`.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function mint(address account, uint256 amount) public onlyOwner returns (bool){
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
        return true;
    }
    constructor (string memory name, string memory symbol, uint8 decimals) public {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
    }


}
contract DonaA is Ownable {

    using SafeMath for * ;
    
    event WithdrawEvent(
        uint256 indexed _projectid,
        uint256  _amount,
        bytes32 indexed _hash,
        address indexed _withdraw);
    event DonationEvent( uint256 indexed _projectid,
        uint256  _amount,
        bytes32 indexed _hash,
        address indexed _withdraw);
        
    ERC20 public tokenAddress;
    

    struct Project {
        uint id;
        uint256 count;
        uint8 _type;
        uint256 starttime;
        uint256 endtime;
        bool status;
        uint256 expectedAmount;
        uint256 amount;
        address[] admins;
        bytes32 hash;
        // bytes32 returnhash;
    }
    Project[] public projects;
    
    constructor () public{
        tokenAddress = new ERC20("GGT","good guy",18);
    }
    
    function create(uint8 _type, uint256 endtime, uint256 expectedAmount, address[] memory admins, bytes32 hash) public onlyOwner {
        uint projectLength = projects.length;
        projects.push(
            Project({
                id: projectLength,
                count:0,
                _type: _type,
                starttime: now,
                endtime: endtime,
                status: true,
                expectedAmount: expectedAmount,
                amount: 0,
                admins: admins,
                hash: hash

            }));
    }

    function totalProject() view public returns(uint256 projectLength) {
        return projects.length;
    }
    

    modifier onlyProjectAdmin(uint256 projectid) {
        bool isAdmin = false;
        for (uint i = 0; i < projects[projectid].admins.length; i++) {
            if (projects[projectid].admins[i] == msg.sender) {
                isAdmin = true;
            }
        }
        require(isAdmin, "not project admin");
        _;
    }

    function withdraw(uint256 projectid, uint256 amount, bytes32 hash) public onlyProjectAdmin(projectid) {
        require(amount <= projects[projectid].amount, "提取的金额大于项目的金额");
        msg.sender.transfer(amount);
        projects[projectid].amount = projects[projectid].amount.sub(amount);
        emit WithdrawEvent(projectid,amount,hash,msg.sender);

    }

    function donation(uint256 projectid, bytes32 hash) public payable {
        require(msg.value > 0, "捐款金额需要大于0");
        require(projects[projectid].status, "当前募资已经满了");
        require(projects[projectid].amount + msg.value <= projects[projectid].expectedAmount, "超过当前募资金额");
        if (projects[projectid].amount + msg.value == projects[projectid].expectedAmount) {
            projects[projectid].status = false;
        }
        projects[projectid].amount = projects[projectid].amount.add(msg.value);
        projects[projectid].count = projects[projectid].count.add(1);
        emit DonationEvent(projectid,msg.value,hash,msg.sender);
        tokenAddress.mint(msg.sender,msg.value);
        
    }
}
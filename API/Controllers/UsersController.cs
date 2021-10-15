using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var members = await _userRepository.GetMembersAsync();
            return Ok(members);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<MemberDto>> GetUserById(int userId)
        {
            return await _userRepository.GetMemberByIdAsync(userId);
        }

        // [HttpGet("{userName}")]
        // public async Task<ActionResult<MemberDto>> GetUserByUserName(string userName)
        // {
        //     return await _userRepository.GetMemberByUserNameAsync(userName);
        // }
    }
}